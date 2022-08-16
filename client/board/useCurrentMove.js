import { useState } from 'react';

export default function useCurrentMove(playerTiles) {
  const [tiles, updateTiles] = useState(
    playerTiles.map((letter, key) => ({
      id: letter + key,
      letter,
      loc: [key, 'TRAY'],
    }))
  );

  const getMovableTile = ([x, y]) => {
    return tiles.find(tile => tile.loc[0] === x && tile.loc[1] === y);
  };

  const moveTile = (id, [x, y]) => {
    console.log(`moving ${id} to [${x}, ${y}]`);
    if (tiles.find(({ loc }) => loc[0] === x && loc[1] === y)) return;
    updateTiles(tiles => tiles.map(tile => (tile.id === id ? { ...tile, loc: [x, y] } : { ...tile })));
  };

  const anyTilesDeployed = tiles.some(t => t.loc[1] !== 'TRAY');

  const recallTiles = () => {
    updateTiles(tiles => tiles.map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  const shuffleTiles = () => {
    updateTiles(tiles => [...tiles].sort(() => Math.random() - 0.5).map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  return {
    getMovableTile,
    anyTilesDeployed,
    recallTiles,
    shuffleTiles,
    moveTile,
  };
}
