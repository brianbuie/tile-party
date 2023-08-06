import { getItemByLoc, getAdjacentItem, hasAnyAdjacentItems } from './locHelpers';
import { getStaticTiles, displayCommas } from './playerHelpers';
import gameConfig from './gameConfig';

/*
    Utilities
*/
const getAllTiles = (game, newTiles) => [...getStaticTiles(game), ...newTiles];

/*
    Check tile placement, find words, check words, score words
*/
const newTilesExist = newTiles => {
  if (!newTiles?.length) throw 'No tiles have been played!';
};

const newTilesAreAligned = newTiles => {
  const allEqual = arr => arr.every(val => val === arr[0]);
  const aligned = allEqual(newTiles.map(t => t.loc[0])) || allEqual(newTiles.map(t => t.loc[1]));
  if (!aligned) throw 'Tiles need to be aligned!';
};

const newTilesAreNotIslands = (game, newTiles) => {
  const staticTiles = getStaticTiles(game);
  const allTiles = [...newTiles, ...staticTiles];
  if (!newTiles.every(tile => hasAnyAdjacentItems(allTiles, tile.loc))) {
    throw 'Tiles need to be touching other tiles!';
  }
  if (!newTiles.some(tile => hasAnyAdjacentItems(staticTiles, tile.loc))) {
    throw 'Tiles need to be touching other tiles!';
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

    let activeTile = getItemByLoc(tiles, startLoc);
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

const tilesPlayedInSingleWord = (words, newTiles) => {
  const mainWord = words.find(({ tiles }) =>
    newTiles.every(tile =>
      tiles.find(t => {
        return t.letter === tile.letter && t.loc[0] === tile.loc[0] && t.loc[1] === tile.loc[1];
      })
    )
  );
  if (!mainWord) throw 'New tiles need to be played in a single word!';
};

const checkValidWords = (words, wordList) => {
  let invalids = [];
  words.forEach(({ word }) => {
    if (!wordList.includes(word)) invalids.push(word);
  });
  if (invalids.length === 1) throw `${invalids[0]} is not a word`;
  if (invalids.length > 1) throw `${displayCommas(invalids)} are not words`;
};

const bonusConfig = {
  DL: {
    appliedTo: 'LETTER',
    multiplier: 2,
  },
  DW: {
    appliedTo: 'WORD',
    multiplier: 2,
  },
  TL: {
    appliedTo: 'LETTER',
    multiplier: 3,
  },
  TW: {
    appliedTo: 'WORD',
    multiplier: 3,
  },
  BINGO: {
    additional: 50,
  },
};

const scoreWords = (validWords, game, newTiles) => {
  const { getLetterValue, spots, tilesPerTurn } = gameConfig(game);
  const scoreDetails = validWords.map(info => {
    let wordBonus = 1;
    const tiles = info.tiles.map(({ letter, loc }) => {
      let score = getLetterValue(letter);
      const isNewTile = !!getItemByLoc(newTiles, loc);
      if (!isNewTile) return { letter, loc, isNewTile, score };
      const { spotType } = getItemByLoc(spots, loc);
      const { appliedTo, multiplier } = bonusConfig[spotType] || {};
      if (appliedTo === 'LETTER') score *= multiplier;
      if (appliedTo === 'WORD') wordBonus *= multiplier;
      return { letter, loc, isNewTile, spotType, score };
    });
    const baseScore = tiles.reduce((total, { score }) => total + score, 0);
    return { word: info.word, tiles, score: baseScore * wordBonus };
  });
  let score = scoreDetails.reduce((total, { score }) => total + score, 0);
  if (newTiles.length === tilesPerTurn) score += bonusConfig.BINGO.additional;
  const words = scoreDetails.map(({ word }) => word);
  const tiles = newTiles.map(({ letter, loc }) => ({ letter, loc }));
  return { score, words, tiles, scoreDetails };
};

export default function scoreMove(game, newTiles, wordList) {
  newTilesExist(newTiles);
  newTilesAreAligned(newTiles);
  // TODO: verify locations don't collide with existing or other new tiles
  if (!game.moveHistory.length) {
    // TODO: Handle first move
  } else {
    newTilesAreNotIslands(game, newTiles);
  }
  const words = getWordsPlayed(game, newTiles);
  tilesPlayedInSingleWord(words, newTiles);
  checkValidWords(words, wordList);
  return scoreWords(words, game, newTiles);
}
