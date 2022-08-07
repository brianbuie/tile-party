import friendly from "./friendly";

const OPTIONS = {
  FRIENDLY: friendly,
};

export default function useBoardLayout(optionName) {
  const { boardSize, specialSpots, defaultSpot } = OPTIONS[optionName].boardLayout;

  const getSpot = ([x, y]) => specialSpots.find(({ loc }) => loc[0] === x && loc[1] === y) || { ...defaultSpot, loc: [x, y] };

  const cols = Array(boardSize[0]).fill();
  const rows = Array(boardSize[1]).fill();
  const boardSpotSize = 100 / boardSize[0];

  const trayLayout = tilesPerTurn => ({
    traySpots: Array(tilesPerTurn).fill(),
    traySpotSize: 95 / tilesPerTurn,
  });

  return { cols, rows, boardSpotSize, trayLayout, getSpot };
}
