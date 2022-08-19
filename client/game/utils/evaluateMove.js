import { getItem, getAdjacentItem, hasAnyAdjacentItems } from '~/game/utils/locHelpers';

const allEqual = arr => arr.every(val => val === arr[0]);

const tilesAreAligned = tiles => allEqual(tiles.map(t => t.loc[0])) || allEqual(tiles.map(t => t.loc[1]));

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

const getWordsBeingPlayed = (oldTiles, newTiles) => {
  const allTiles = [...oldTiles, ...newTiles];
  let words = {};
  newTiles.forEach(({ loc }) => {
    [0, 1].forEach(direction => {
      const { id, word, tiles } = getWordInDirection(allTiles, loc, direction);
      if (word.length < 2) return;
      words[id] = { word, tiles };
    });
  });
  return Object.values(words);
};

export default function evaluateMove(oldTiles, newTiles) {
  // There are tiles on the board
  if (!newTiles.length) return null;

  // All tiles share an X or a Y
  if (!tilesAreAligned(newTiles)) return null;

  // TODO handle first move

  // All tiles together
  const allTiles = [...oldTiles, ...newTiles];

  // All new tiles are next to other tiles
  if (!newTiles.every(tile => hasAnyAdjacentItems(allTiles, tile.loc))) return null;

  // At least one new tile should be touching an old tile
  if (!newTiles.some(tile => hasAnyAdjacentItems(oldTiles, tile.loc))) return null;

  // Get all words being played
  const words = getWordsBeingPlayed(oldTiles, newTiles);

  return words;
  // Check words against the dictionary
  //
  // evaluate bonuses and add it all up
  return 'valid';
}
