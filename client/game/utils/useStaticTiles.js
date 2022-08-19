import { getItem, getAllAdjacentItems } from '~/game/utils/locHelpers';

export default function useStaticTiles(moveHistory) {
  const staticTiles = moveHistory.reduce((all, curr) => [...all, ...curr.tiles], []);

  const lastMoveTiles = moveHistory[moveHistory.length - 1]?.tiles || [];

  const isLastMove = ([x, y]) => !!getItem(lastMoveTiles, [x, y]);

  const getStaticTile = ([x, y]) => {
    const tile = getItem(staticTiles, [x, y]);
    if (!tile) return null;
    return { ...tile, isLastMove: isLastMove([x, y]) };
  };

  const getAllAdjacentStaticTiles = ([x, y]) => getAllAdjacentItems(staticTiles, [x, y]);

  return { staticTiles, getStaticTile, getAllAdjacentStaticTiles };
}
