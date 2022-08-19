import { getTile, getAllAdjacentTiles } from '~/game/utils/tileLocationHelpers';

export default function useStaticTiles(moveHistory) {
  const staticTiles = moveHistory.reduce((all, curr) => [...all, ...curr.tiles], []);

  const lastMoveTiles = moveHistory[moveHistory.length - 1]?.tiles || [];

  const isLastMove = ([x, y]) => !!getTile(lastMoveTiles, [x, y]);

  const getStaticTile = ([x, y]) => {
    const tile = getTile(staticTiles, [x, y]);
    if (!tile) return null;
    return { ...tile, isLastMove: isLastMove([x, y]) };
  };

  const getAllAdjacentStaticTiles = ([x, y]) => getAllAdjacentTiles(staticTiles, [x, y]);

  return { staticTiles, getStaticTile, getAllAdjacentStaticTiles };
}
