import friendly from '~/game/config/friendly';

const layouts = {
  FRIENDLY: friendly,
};

export default function useBoardLayout(layoutName) {
  const { boardSize, specialSpots, defaultSpot } = layouts[layoutName].boardLayout;

  const getSpotType = ([x, y]) => {
    const special = specialSpots.find(({ loc }) => loc[0] === x && loc[1] === y);
    return special?.type || defaultSpot.type;
  };

  const cols = Array(boardSize[0]).fill();
  const rows = Array(boardSize[1]).fill();
  const boardSpotSize = 100 / boardSize[0];

  const trayLayout = tilesPerTurn => ({
    traySpots: Array(tilesPerTurn).fill(),
    traySpotSize: 95 / tilesPerTurn,
  });

  return { cols, rows, boardSpotSize, trayLayout, getSpotType };
}
