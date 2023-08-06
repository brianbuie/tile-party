export const sameLoc = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

export const getItemByLoc = (items, [x, y]) => items.find(({ loc }) => sameLoc(loc, [x, y]));

export const getAdjacentItem = (items, [x, y], [_x, _y]) => getItemByLoc(items, [x + _x, y + _y]);

// top, right, bottom, left
// prettier-ignore
export const getAllAdjacentItems = (items, loc) => [[0, -1], [1, 0], [0, 1], [-1, 0]].map(dif => getAdjacentItem(items, loc, dif))

export const hasAnyAdjacentItems = (items, [x, y]) => getAllAdjacentItems(items, [x, y]).some(c => !!c);

export const getAbsoluteLoc = ([x, y], size) => [y * size, 100 - x * size - size, 100 - y * size - size, x * size];
