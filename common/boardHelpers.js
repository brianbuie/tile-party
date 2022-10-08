import { getItemByLoc } from './locHelpers';

const makeSpots = ({ boardSize, specialSpots }) =>
  [...Array(boardSize[0] * boardSize[1])]
    .map((_, k) => [k % xSize, Math.floor(k / ySize)])
    .map(([x, y]) => {
      const { spotType } = getItemByLoc(specialSpots, [x, y]) || { spotType: 'DEFAULT' };
      return { spotType, loc: [x, y] };
    });

const getSizes = ({ boardSize, tilesPerTurn }) => ({
  boardSpotSize: 100 / boardSize[0],
  traySpotSize: 100 / tilesPerTurn,
  avgTileSize: (traySpotSize + boardSpotSize) / 2,
});
