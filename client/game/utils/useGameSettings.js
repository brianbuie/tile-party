import boardLayoutsConfig from '@common/config/boardLayouts';
import tileAmountsConfig from '@common/config/tileAmounts';
import tileValuesConfig from '@common/config/tileValues';
import { useActiveGame } from '~/game/ActiveGame';

export default function useGameSettings() {
  const { settings } = useActiveGame() || {};
  if (!settings) return null;

  const { boardSize, spotTypes } = boardLayoutsConfig[settings.boardLayout];
  const { tilesPerTurn } = settings;
  const tileAmounts = tileAmountsConfig[settings.tileAmounts];
  const tileValues = tileValuesConfig[settings.tileValues];

  const getSpot = ([x, y]) => {
    const { spotType, bonusType, bonusAmount } = Object.values(spotTypes).find(({ locations }) =>
      locations.find(([_x, _y]) => _x === x && _y === y)
    );
    return { spotType, bonusType, bonusAmount };
  };

  const cols = [...Array(boardSize[0])];
  const rows = [...Array(boardSize[1])];
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
