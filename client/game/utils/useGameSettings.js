import boardLayoutsConfig from '@common/config/boardLayouts';
import tileAmountsConfig from '@common/config/tileAmounts';
import tileValuesConfig from '@common/config/tileValues';
import { getItem } from '~/game/utils/locHelpers';
import { useActiveGame } from '~/game/ActiveGame';

export default function useGameSettings() {
  const { settings } = useActiveGame() || {};
  if (!settings) return null;

  const { boardSize, spotTypes, specialSpots } = boardLayoutsConfig[settings.boardLayout];
  const { tilesPerTurn } = settings;
  const tileAmounts = tileAmountsConfig[settings.tileAmounts];
  const tileValues = tileValuesConfig[settings.tileValues];

  const cols = [...Array(boardSize[0])];
  const rows = [...Array(boardSize[1])];

  const spots = [...Array(boardSize[0] * boardSize[1])].map((_, k) => {
    const y = Math.floor(k / boardSize[1]);
    const x = k % boardSize[0];
    const { spotType } = specialSpots.find(({ loc }) => loc[0] === x && loc[1] === y) || {};
    return { ...spotTypes[spotType || 'DEFAULT'], loc: [x, y] };
  });

  const getSpot = ([x, y]) => getItem(spots, [x, y]);

  const boardSpotSize = 100 / boardSize[0];
  const traySpots = [...Array(tilesPerTurn)];
  const traySpotSize = 95 / tilesPerTurn;
  const avgTileSize = (traySpotSize + boardSpotSize) / 2;

  const getLetterValue = letter => tileValues[letter];

  return {
    cols,
    rows,
    boardSpotSize,
    getSpot,
    traySpots,
    traySpotSize,
    getLetterValue,
    avgTileSize,
  };
}
