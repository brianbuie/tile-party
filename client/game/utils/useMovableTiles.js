import { useState, useEffect } from 'react';

export default function useMovableTiles(myTiles) {
  const [tiles, updateTiles] = useState([]);

  useEffect(() => {
    updateTiles(
      myTiles.map((letter, key) => ({
        id: letter + key,
        letter,
        loc: [key, 'TRAY'],
      }))
    );
  }, [myTiles]);

  const getMovableTile = ([x, y]) => {
    return tiles.find(tile => tile.loc[0] === x && tile.loc[1] === y);
  };

  const moveTile = (id, [x, y]) => {
    console.log(`moving ${id} to [${x}, ${y}]`);
    if (getMovableTile([x, y])) return;
    updateTiles(tiles => tiles.map(tile => (tile.id === id ? { ...tile, loc: [x, y] } : { ...tile })));
  };

  const deployedTiles = tiles.filter(t => t.loc[1] !== 'TRAY');

  const recallTiles = () => {
    updateTiles(tiles => tiles.map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  const shuffleTiles = () => {
    updateTiles(tiles => [...tiles].sort(() => Math.random() - 0.5).map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  return {
    getMovableTile,
    moveTile,
    deployedTiles,
    recallTiles,
    shuffleTiles,
  };
}
