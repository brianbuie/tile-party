export default {
  FRIENDLY: {
    boardSize: [15, 15],
    spotTypes: {
      CENTER: {
        spotType: 'CENTER',
        bonusType: null,
        bonusAmount: 0,
        locations: [[7, 7]],
      },
      BLANK: {
        spotType: 'BLANK',
        bonusType: null,
        bonusAmount: 0,
        locations: [
          [0, 0],
          [1, 0],
          [2, 0],
          [4, 0],
          [5, 0],
          [7, 0],
          [9, 0],
          [10, 0],
          [12, 0],
          [13, 0],
          [14, 0],
          [0, 1],
          [1, 1],
          [3, 1],
          [4, 1],
          [6, 1],
          [7, 1],
          [8, 1],
          [10, 1],
          [11, 1],
          [13, 1],
          [14, 1],
          [0, 2],
          [2, 2],
          [3, 2],
          [5, 2],
          [6, 2],
          [7, 2],
          [8, 2],
          [9, 2],
          [11, 2],
          [12, 2],
          [14, 2],
          [1, 3],
          [2, 3],
          [4, 3],
          [5, 3],
          [6, 3],
          [8, 3],
          [9, 3],
          [10, 3],
          [12, 3],
          [13, 3],
          [0, 4],
          [1, 4],
          [3, 4],
          [4, 4],
          [5, 4],
          [7, 4],
          [9, 4],
          [10, 4],
          [11, 4],
          [13, 4],
          [14, 4],
          [0, 5],
          [2, 5],
          [3, 5],
          [4, 5],
          [6, 5],
          [7, 5],
          [8, 5],
          [10, 5],
          [11, 5],
          [12, 5],
          [14, 5],
          [1, 6],
          [2, 6],
          [3, 6],
          [5, 6],
          [6, 6],
          [7, 6],
          [8, 6],
          [9, 6],
          [11, 6],
          [12, 6],
          [13, 6],
          [0, 7],
          [1, 7],
          [2, 7],
          [4, 7],
          [5, 7],
          [6, 7],
          [8, 7],
          [9, 7],
          [10, 7],
          [12, 7],
          [13, 7],
          [14, 7],
          [1, 8],
          [2, 8],
          [3, 8],
          [5, 8],
          [6, 8],
          [7, 8],
          [8, 8],
          [9, 8],
          [11, 8],
          [12, 8],
          [13, 8],
          [0, 9],
          [2, 9],
          [3, 9],
          [4, 9],
          [6, 9],
          [7, 9],
          [8, 9],
          [10, 9],
          [11, 9],
          [12, 9],
          [14, 9],
          [0, 10],
          [1, 10],
          [3, 10],
          [4, 10],
          [5, 10],
          [7, 10],
          [9, 10],
          [10, 10],
          [11, 10],
          [13, 10],
          [14, 10],
          [1, 11],
          [2, 11],
          [4, 11],
          [5, 11],
          [6, 11],
          [8, 11],
          [9, 11],
          [10, 11],
          [12, 11],
          [13, 11],
          [0, 12],
          [2, 12],
          [3, 12],
          [5, 12],
          [6, 12],
          [7, 12],
          [8, 12],
          [9, 12],
          [11, 12],
          [12, 12],
          [14, 12],
          [0, 13],
          [1, 13],
          [3, 13],
          [4, 13],
          [6, 13],
          [7, 13],
          [8, 13],
          [10, 13],
          [11, 13],
          [13, 13],
          [14, 13],
          [0, 14],
          [1, 14],
          [2, 14],
          [4, 14],
          [5, 14],
          [7, 14],
          [9, 14],
          [10, 14],
          [12, 14],
          [13, 14],
          [14, 14],
        ],
      },
      DL: {
        spotType: 'DL',
        bonusType: 'LETTER',
        bonusAmount: 2,
        locations: [
          [2, 1],
          [12, 1],
          [1, 2],
          [4, 2],
          [10, 2],
          [13, 2],
          [2, 4],
          [6, 4],
          [8, 4],
          [12, 4],
          [4, 6],
          [10, 6],
          [4, 8],
          [10, 8],
          [2, 10],
          [6, 10],
          [8, 10],
          [12, 10],
          [1, 12],
          [4, 12],
          [10, 12],
          [13, 12],
          [2, 13],
          [12, 13],
        ],
      },
      DW: {
        spotType: 'DW',
        bonusType: 'WORD',
        bonusAmount: 2,
        locations: [
          [5, 1],
          [9, 1],
          [7, 3],
          [1, 5],
          [13, 5],
          [3, 7],
          [11, 7],
          [1, 9],
          [13, 9],
          [7, 11],
          [5, 13],
          [9, 13],
        ],
      },
      TL: {
        spotType: 'TL',
        bonusType: 'LETTER',
        bonusAmount: 3,
        locations: [
          [6, 0],
          [8, 0],
          [3, 3],
          [11, 3],
          [5, 5],
          [9, 5],
          [0, 6],
          [14, 6],
          [0, 8],
          [14, 8],
          [5, 9],
          [9, 9],
          [3, 11],
          [11, 11],
          [6, 14],
          [8, 14],
        ],
      },
      TW: {
        spotType: 'TW',
        bonusType: 'WORD',
        bonusAmount: 3,
        locations: [
          [3, 0],
          [11, 0],
          [0, 3],
          [14, 3],
          [0, 11],
          [14, 11],
          [3, 14],
          [11, 14],
        ],
      },
    },
  },
};
