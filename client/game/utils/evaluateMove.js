import { getItem, getAdjacentItem, hasAnyAdjacentItems } from '~/game/utils/locHelpers';
import { getStaticTiles, getAllTiles } from '~/game/utils/gameHelpers';
import useGameSettings from '~/game/utils/useGameSettings';

const newTilesExist = newTiles => {
  if (!newTiles?.length) throw 'No tiles have been played.';
};

const newTilesAreAligned = newTiles => {
  const allEqual = arr => arr.every(val => val === arr[0]);
  const aligned = allEqual(newTiles.map(t => t.loc[0])) || allEqual(newTiles.map(t => t.loc[1]));
  if (!aligned) throw 'All tiles played must align horizontally or vertically.';
};

const newTilesAreNotIslands = (game, newTiles) => {
  const staticTiles = getStaticTiles(game);
  const allTiles = [...newTiles, ...staticTiles];
  if (!newTiles.every(tile => hasAnyAdjacentItems(allTiles, tile.loc))) {
    throw 'Tiles must be placed next to other tiles.';
  }
  if (!newTiles.some(tile => hasAnyAdjacentItems(staticTiles, tile.loc))) {
    throw 'At least one tile must be placed next to an existing tile.';
  }
};

const getWordsPlayed = (game, newTiles) => {
  const getWordInDirection = (tiles, loc, directionKey) => {
    const toStart = [0, 0];
    const toEnd = [0, 0];
    toStart[directionKey] = -1;
    toEnd[directionKey] = 1;

    let startLoc = loc;
    let nextTile = getAdjacentItem(tiles, startLoc, toStart);
    while (nextTile) {
      startLoc = nextTile.loc;
      nextTile = getAdjacentItem(tiles, startLoc, toStart);
    }

    let activeTile = getItem(tiles, startLoc);
    let inWord = [];
    while (activeTile) {
      inWord = [...inWord, { ...activeTile }];
      activeTile = getAdjacentItem(tiles, activeTile.loc, toEnd);
    }

    const start = inWord[0].loc;
    const end = inWord[inWord.length - 1].loc;
    const word = inWord.map(t => t.letter).join('');
    return {
      id: `${word}_${start[0]},${start[1]}_${end[0]},${end[1]}`,
      word,
      tiles: inWord,
    };
  };

  const allTiles = getAllTiles(game, newTiles);

  let unique = {};
  newTiles.forEach(({ loc }) => {
    [0, 1].forEach(direction => {
      const { id, word, tiles } = getWordInDirection(allTiles, loc, direction);
      if (word.length < 2) return;
      unique[id] = { word, tiles };
    });
  });
  return Object.values(unique);
};

const checkValidWords = (words, wordList) => {
  let invalidWords = [];
  words.forEach(({ word }) => {
    if (!wordList.includes(word)) invalidWords.push(word);
  });
  if (invalidWords.length === 1) throw invalidWords[0] + ' is not a word.';
  if (invalidWords.length > 1) throw invalidWords.join(', ') + ' are not words.';
};

const scoreWords = (words, game, newTiles) => {
  const { getLetterValue, getSpotBonus, tilesPerTurn, bonuses } = useGameSettings(game);
  const scoredWords = words.map(info => {
    let wordBonus = 1;
    const tiles = info.tiles.map(({ letter, loc }) => {
      const letterValue = getLetterValue(letter);
      const spot = getSpotBonus(loc);
      const isNewTile = !!getItem(newTiles, loc);
      let score = letterValue;
      if (!isNewTile) return { letter, loc, isNewTile, score };
      if (spot.bonusType === 'LETTER') score *= spot.bonusAmount;
      if (spot.bonusType === 'WORD') wordBonus *= spot.bonusAmount;
      return { letter, loc, isNewTile, ...spot, score };
    });
    const letterScores = tiles.reduce((all, curr) => all + curr.score, 0);
    return { word: info.word, tiles, score: letterScores * wordBonus };
  });
  let score = scoredWords.reduce((all, curr) => all + curr.score, 0);
  if (newTiles.length === tilesPerTurn) score += bonuses.BINGO;
  return { score, words: scoredWords };
};

export default function evaluateMove(game, newTiles, wordList) {
  newTilesExist(newTiles);
  newTilesAreAligned(newTiles);
  // TODO: verify locations don't collide with existing or other new tiles
  if (!game.moveHistory.length) {
    // TODO: Handle first move
  } else {
    newTilesAreNotIslands(game, newTiles);
  }
  const words = getWordsPlayed(game, newTiles);
  checkValidWords(words, wordList);
  return scoreWords(words, game, newTiles);
}
