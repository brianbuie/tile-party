export const getItem = (items, [x, y]) => items.find(({ loc }) => x === loc[0] && y === loc[1]);

export const getAdjacentItem = (items, [x, y], [_x, _y]) => getItem(items, [x + _x, y + _y]);

export const getAllAdjacentItems = (items, loc) => {
  const t = getAdjacentItem(items, loc, [0, -1]);
  const r = getAdjacentItem(items, loc, [1, 0]);
  const b = getAdjacentItem(items, loc, [0, 1]);
  const l = getAdjacentItem(items, loc, [-1, 0]);
  return [t, r, b, l];
};

export const hasAnyAdjacentItems = (items, [x, y]) => getAllAdjacentItems(items, [x, y]).some(c => !!c);

export const makeLocs = ([xSize, ySize]) => [...Array(xSize * ySize)].map((_, k) => [k % xSize, Math.floor(k / ySize)]);
