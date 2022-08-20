import React, { useContext, useState, useEffect } from 'react';
import { useActiveGame } from '~/game/ActiveGame';
import evaluateMove from '~/game/utils/evaluateMove';
import { getItem } from '~/game/utils/locHelpers';

const CurrentMoveContext = React.createContext({});

export default function CurrentMoveProvider(props) {
  const { staticTiles, myTiles } = useActiveGame();
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

  const moveTile = (id, [x, y]) => {
    if (getItem(tiles, [x, y])) return;
    if (getItem(staticTiles, [x, y])) return;
    console.log(`moving to ${x}, ${y}`);
    updateTiles(tiles => tiles.map(tile => (tile.id === id ? { ...tile, loc: [x, y] } : { ...tile })));
  };

  const deployedTiles = tiles.filter(t => t.loc[1] !== 'TRAY');

  const recallTiles = () => {
    updateTiles(tiles => tiles.map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  const shuffleTiles = () => {
    updateTiles(tiles => [...tiles].sort(() => Math.random() - 0.5).map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  if (deployedTiles.length) {
    const result = evaluateMove(staticTiles, deployedTiles);
    console.log(result);
  }

  const value = {
    tiles,
    deployedTiles,
    recallTiles,
    shuffleTiles,
    moveTile,
  };

  return <CurrentMoveContext.Provider value={value} {...props} />;
}

export const useCurrentMove = () => useContext(CurrentMoveContext);
