import boardLayoutsConfig from '@common/config/boardLayouts';
import tileAmountsConfig from '@common/config/tileAmounts';
import pointsConfig from '@common/config/points';
import { makeLocs, getItem } from '~/game/utils/locHelpers';

export default function useGameSettings({ settings }) {
  const { boardSize, spotTypes, specialSpots } = boardLayoutsConfig[settings.boardLayout];
  const { tilesPerTurn } = settings;
  const tileAmounts = tileAmountsConfig[settings.tileAmounts];
  const { tileValues, bonuses } = pointsConfig[settings.tileValues];

  const spots = makeLocs(boardSize).map(([x, y]) => {
    const { spotType } = specialSpots.find(({ loc }) => loc[0] === x && loc[1] === y) || {};
    return { ...spotTypes[spotType || 'DEFAULT'], loc: [x, y] };
  });

  const boardSpotSize = 100 / boardSize[0];
  const traySpotSize = 100 / tilesPerTurn;
  const avgTileSize = (traySpotSize + boardSpotSize) / 2;

  const getLetterValue = letter => tileValues[letter];

  const getSpotBonus = ([x, y]) => {
    const spot = getItem(spots, [x, y]);
    return spotTypes[spot.spotType];
  };

  return {
    spots,
    bonuses,
    boardSpotSize,
    boardSize,
    traySpotSize,
    tilesPerTurn,
    getLetterValue,
    getSpotBonus,
    avgTileSize,
  };
}
