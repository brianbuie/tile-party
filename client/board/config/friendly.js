const tiles = {
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
};

const boardLayout = {
  boardSize: [15, 15],
  bonuses: {
    DL: {
      type: "LETTER",
      multiplier: 2,
    },
    DW: {
      type: "WORD",
      multiplier: 2,
    },
    TL: {
      type: "LETTER",
      multiplier: 3,
    },
    TW: {
      type: "WORD",
      multiplier: 3,
    },
  },
  defaultSpot: {
    type: "BLANK",
  },
  specialSpots: [
    {
      type: "CENTER",
      loc: [7, 7],
    },
    {
      type: "TW",
      loc: [3, 0],
    },
    {
      type: "TL",
      loc: [6, 0],
    },
    {
      type: "TL",
      loc: [8, 0],
    },
    {
      type: "TW",
      loc: [11, 0],
    },
    {
      type: "DL",
      loc: [2, 1],
    },
    {
      type: "DW",
      loc: [5, 1],
    },
    {
      type: "DW",
      loc: [9, 1],
    },
    {
      type: "DL",
      loc: [12, 1],
    },
    {
      type: "DL",
      loc: [1, 2],
    },
    {
      type: "DL",
      loc: [4, 2],
    },
    {
      type: "DL",
      loc: [10, 2],
    },
    {
      type: "DL",
      loc: [13, 2],
    },
    {
      type: "TW",
      loc: [0, 3],
    },
    {
      type: "TL",
      loc: [3, 3],
    },
    {
      type: "DW",
      loc: [7, 3],
    },
    {
      type: "TL",
      loc: [11, 3],
    },
    {
      type: "TW",
      loc: [14, 3],
    },
    {
      type: "DL",
      loc: [2, 4],
    },
    {
      type: "DL",
      loc: [6, 4],
    },
    {
      type: "DL",
      loc: [8, 4],
    },
    {
      type: "DL",
      loc: [12, 4],
    },
    {
      type: "DW",
      loc: [1, 5],
    },
    {
      type: "TL",
      loc: [5, 5],
    },
    {
      type: "TL",
      loc: [9, 5],
    },
    {
      type: "DW",
      loc: [13, 5],
    },
    {
      type: "TL",
      loc: [0, 6],
    },
    {
      type: "DL",
      loc: [4, 6],
    },
    {
      type: "DL",
      loc: [10, 6],
    },
    {
      type: "TL",
      loc: [14, 6],
    },
    {
      type: "DW",
      loc: [3, 7],
    },
    {
      type: "DW",
      loc: [11, 7],
    },
    {
      type: "TL",
      loc: [0, 8],
    },
    {
      type: "DL",
      loc: [4, 8],
    },
    {
      type: "DL",
      loc: [10, 8],
    },
    {
      type: "TL",
      loc: [14, 8],
    },
    {
      type: "DW",
      loc: [1, 9],
    },
    {
      type: "TL",
      loc: [5, 9],
    },
    {
      type: "TL",
      loc: [9, 9],
    },
    {
      type: "DW",
      loc: [13, 9],
    },
    {
      type: "DL",
      loc: [2, 10],
    },
    {
      type: "DL",
      loc: [6, 10],
    },
    {
      type: "DL",
      loc: [8, 10],
    },
    {
      type: "DL",
      loc: [12, 10],
    },
    {
      type: "TW",
      loc: [0, 11],
    },
    {
      type: "TL",
      loc: [3, 11],
    },
    {
      type: "DW",
      loc: [7, 11],
    },
    {
      type: "TL",
      loc: [11, 11],
    },
    {
      type: "TW",
      loc: [14, 11],
    },
    {
      type: "DL",
      loc: [1, 12],
    },
    {
      type: "DL",
      loc: [4, 12],
    },
    {
      type: "DL",
      loc: [10, 12],
    },
    {
      type: "DL",
      loc: [13, 12],
    },
    {
      type: "DL",
      loc: [2, 13],
    },
    {
      type: "DW",
      loc: [5, 13],
    },
    {
      type: "DW",
      loc: [9, 13],
    },
    {
      type: "DL",
      loc: [12, 13],
    },
    {
      type: "TW",
      loc: [3, 14],
    },
    {
      type: "TL",
      loc: [6, 14],
    },
    {
      type: "TL",
      loc: [8, 14],
    },
    {
      type: "TW",
      loc: [11, 14],
    },
  ],
};

const tilesPerTurn = 7;

export default { tiles, boardLayout, tilesPerTurn };
