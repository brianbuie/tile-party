import { getItem, getAdjacentItem, hasAnyAdjacentItems } from '~/game/utils/locHelpers';
import { getStaticTiles } from '~/game/utils/gameHelpers';

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

const scoreWords = (game, newTiles, wordList) => {
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

  const staticTiles = getStaticTiles(game);
  const allTiles = [...staticTiles, ...newTiles];

  let words = {};
  newTiles.forEach(({ loc }) => {
    [0, 1].forEach(direction => {
      const { id, word, tiles } = getWordInDirection(allTiles, loc, direction);
      if (word.length < 2) return;
      words[id] = { word, tiles };
    });
  });

  const checked = Object.values(words).map(info => ({
    ...info,
    isValid: wordList.includes(info.word),
  }));

  const invalid = checked.filter(w => !w.isValid);
  if (invalid.length === 1) {
    throw invalid[0].word + ' is not a word.';
  }
  if (invalid.length > 1) {
    throw invalid.map(i => i.word).join(', ') + ' are not words.';
  }

  return checked;
};

export default function evaluateMove(game, newTiles, wordList) {
  newTilesExist(newTiles);
  newTilesAreAligned(newTiles);
  if (!game.moveHistory.length) {
    // TODO: Handle first move
  } else {
    newTilesAreNotIslands(game, newTiles);
  }
  return scoreWords(game, newTiles, wordList);
}
