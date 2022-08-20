import boardLayoutsConfig from '@common/config/boardLayouts';
import tileAmountsConfig from '@common/config/tileAmounts';
import tileValuesConfig from '@common/config/tileValues';
import { makeLocs } from '~/game/utils/locHelpers';

export default function useGameSettings({ settings }) {
  const { boardSize, spotTypes, specialSpots } = boardLayoutsConfig[settings.boardLayout];
  const { tilesPerTurn } = settings;
  const tileAmounts = tileAmountsConfig[settings.tileAmounts];
  const tileValues = tileValuesConfig[settings.tileValues];

  const spots = makeLocs(boardSize).map(([x, y]) => {
    const { spotType } = specialSpots.find(({ loc }) => loc[0] === x && loc[1] === y) || {};
    return { ...spotTypes[spotType || 'DEFAULT'], loc: [x, y] };
  });

  const boardSpotSize = 100 / boardSize[0];
  const traySpots = [...Array(tilesPerTurn)];
  const traySpotSize = 100 / tilesPerTurn;
  const avgTileSize = (traySpotSize + boardSpotSize) / 2;

  const getLetterValue = letter => tileValues[letter];

  return {
    spots,
    boardSpotSize,
    traySpots,
    traySpotSize,
    getLetterValue,
    avgTileSize,
  };
}
