export default function useStaticTiles(moveHistory) {
  const getStaticTile = ([x, y]) => {
    const tileAtLoc = ({ loc }) => x === loc[0] && y === loc[1];
    const moveKey = moveHistory.findIndex(({ tiles }) => tiles.find(tileAtLoc));
    if (moveKey < 0) return null;
    const isLastMove = moveKey === moveHistory.length - 1;
    const tile = moveHistory[moveKey].tiles.find(tileAtLoc);
    return { ...tile, isLastMove };
  };

  const getSurroundingTiles = ([x, y]) => {
    const t = getStaticTile([x, y - 1]);
    const r = getStaticTile([x + 1, y]);
    const b = getStaticTile([x, y + 1]);
    const l = getStaticTile([x - 1, y]);
    return [t, r, b, l];
  };

  return { getStaticTile, getSurroundingTiles };
}
