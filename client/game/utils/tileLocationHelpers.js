export const getTile = (tiles, [x, y]) => tiles.find(({ loc }) => x === loc[0] && y === loc[1]);

export const getAdjacentTile = (tiles, [x, y], [_x, _y]) => getTile(tiles, [x + _x, y + _y]);

export const getAllAdjacentTiles = (tiles, loc) => {
  const t = getAdjacentTile(tiles, loc, [0, -1]);
  const r = getAdjacentTile(tiles, loc, [1, 0]);
  const b = getAdjacentTile(tiles, loc, [0, 1]);
  const l = getAdjacentTile(tiles, loc, [-1, 0]);
  return [t, r, b, l];
};

export const hasAnyAdjacentTiles = (tiles, [x, y]) => getAllAdjacentTiles(tiles, [x, y]).some(c => !!c);
