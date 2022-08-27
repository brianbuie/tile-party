import { getItemByLoc } from './locHelpers';

const makeLocs = ([xSize, ySize]) => [...Array(xSize * ySize)].map((_, k) => [k % xSize, Math.floor(k / ySize)]);

export default function gameConfig() {
  // TODO: Check gameMode in settings
  // friendly is the only one, so skipping for now.
  const { boardSize, tilesPerTurn, tiles, bonuses, specialSpots } = friendly();

  const boardSpotSize = 100 / boardSize[0];
  const traySpotSize = 100 / tilesPerTurn;
  const avgTileSize = (traySpotSize + boardSpotSize) / 2;

  const getLetterValue = letter => tiles[letter][0];

  const spots = makeLocs(boardSize).map(([x, y]) => {
    const { spotType } = getItemByLoc(specialSpots, [x, y]) || { spotType: 'DEFAULT' };
    return { spotType, loc: [x, y] };
  });

  return {
    spots,
    specialSpots,
    bonuses,
    boardSpotSize,
    boardSize,
    traySpotSize,
    tilesPerTurn,
    getLetterValue,
    avgTileSize,
  };
}

export function friendly() {
  return {
    boardSize: [15, 15],
    tilesPerTurn: 7,
    tiles: {
      // [Value, Amount]
      BLANK: [0, 2],
      A: [1, 9],
      B: [4, 2],
      C: [4, 2],
      D: [2, 5],
      E: [1, 13],
      F: [4, 2],
      G: [3, 3],
      H: [3, 4],
      I: [1, 8],
      J: [10, 1],
      K: [5, 1],
      L: [2, 4],
      M: [4, 2],
      N: [2, 5],
      O: [1, 8],
      P: [4, 2],
      Q: [10, 1],
      R: [1, 6],
      S: [1, 5],
      T: [1, 7],
      U: [2, 4],
      V: [5, 2],
      W: [4, 2],
      X: [8, 1],
      Y: [3, 2],
      Z: [10, 1],
    },
    specialSpots: [
      {
        spotType: 'CENTER',
        loc: [7, 7],
      },
      {
        spotType: 'TW',
        loc: [3, 0],
      },
      {
        spotType: 'TL',
        loc: [6, 0],
      },
      {
        spotType: 'TL',
        loc: [8, 0],
      },
      {
        spotType: 'TW',
        loc: [11, 0],
      },
      {
        spotType: 'DL',
        loc: [2, 1],
      },
      {
        spotType: 'DW',
        loc: [5, 1],
      },
      {
        spotType: 'DW',
        loc: [9, 1],
      },
      {
        spotType: 'DL',
        loc: [12, 1],
      },
      {
        spotType: 'DL',
        loc: [1, 2],
      },
      {
        spotType: 'DL',
        loc: [4, 2],
      },
      {
        spotType: 'DL',
        loc: [10, 2],
      },
      {
        spotType: 'DL',
        loc: [13, 2],
      },
      {
        spotType: 'TW',
        loc: [0, 3],
      },
      {
        spotType: 'TL',
        loc: [3, 3],
      },
      {
        spotType: 'DW',
        loc: [7, 3],
      },
      {
        spotType: 'TL',
        loc: [11, 3],
      },
      {
        spotType: 'TW',
        loc: [14, 3],
      },
      {
        spotType: 'DL',
        loc: [2, 4],
      },
      {
        spotType: 'DL',
        loc: [6, 4],
      },
      {
        spotType: 'DL',
        loc: [8, 4],
      },
      {
        spotType: 'DL',
        loc: [12, 4],
      },
      {
        spotType: 'DW',
        loc: [1, 5],
      },
      {
        spotType: 'TL',
        loc: [5, 5],
      },
      {
        spotType: 'TL',
        loc: [9, 5],
      },
      {
        spotType: 'DW',
        loc: [13, 5],
      },
      {
        spotType: 'TL',
        loc: [0, 6],
      },
      {
        spotType: 'DL',
        loc: [4, 6],
      },
      {
        spotType: 'DL',
        loc: [10, 6],
      },
      {
        spotType: 'TL',
        loc: [14, 6],
      },
      {
        spotType: 'DW',
        loc: [3, 7],
      },
      {
        spotType: 'DW',
        loc: [11, 7],
      },
      {
        spotType: 'TL',
        loc: [0, 8],
      },
      {
        spotType: 'DL',
        loc: [4, 8],
      },
      {
        spotType: 'DL',
        loc: [10, 8],
      },
      {
        spotType: 'TL',
        loc: [14, 8],
      },
      {
        spotType: 'DW',
        loc: [1, 9],
      },
      {
        spotType: 'TL',
        loc: [5, 9],
      },
      {
        spotType: 'TL',
        loc: [9, 9],
      },
      {
        spotType: 'DW',
        loc: [13, 9],
      },
      {
        spotType: 'DL',
        loc: [2, 10],
      },
      {
        spotType: 'DL',
        loc: [6, 10],
      },
      {
        spotType: 'DL',
        loc: [8, 10],
      },
      {
        spotType: 'DL',
        loc: [12, 10],
      },
      {
        spotType: 'TW',
        loc: [0, 11],
      },
      {
        spotType: 'TL',
        loc: [3, 11],
      },
      {
        spotType: 'DW',
        loc: [7, 11],
      },
      {
        spotType: 'TL',
        loc: [11, 11],
      },
      {
        spotType: 'TW',
        loc: [14, 11],
      },
      {
        spotType: 'DL',
        loc: [1, 12],
      },
      {
        spotType: 'DL',
        loc: [4, 12],
      },
      {
        spotType: 'DL',
        loc: [10, 12],
      },
      {
        spotType: 'DL',
        loc: [13, 12],
      },
      {
        spotType: 'DL',
        loc: [2, 13],
      },
      {
        spotType: 'DW',
        loc: [5, 13],
      },
      {
        spotType: 'DW',
        loc: [9, 13],
      },
      {
        spotType: 'DL',
        loc: [12, 13],
      },
      {
        spotType: 'TW',
        loc: [3, 14],
      },
      {
        spotType: 'TL',
        loc: [6, 14],
      },
      {
        spotType: 'TL',
        loc: [8, 14],
      },
      {
        spotType: 'TW',
        loc: [11, 14],
      },
    ],
  };
}
