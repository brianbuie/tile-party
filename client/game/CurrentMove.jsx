import React, { useContext, useState, useEffect } from 'react';
import { useActiveGame } from '~/game/ActiveGame';
import scoreMove from '@common/scoreMove';
import { getStaticTiles } from '@common/playerHelpers';
import { getItemByLoc } from '@common/locHelpers';
import { useWordList } from '~/utils/useQuery';

const CurrentMoveContext = React.createContext({});

const makeMovableTiles = game =>
  game.myTiles.map((letter, key) => ({
    id: letter + key,
    letter,
    loc: [key, 'TRAY'],
  }));

export default function CurrentMoveProvider(props) {
  const game = useActiveGame();
  const [tiles, updateTiles] = useState(makeMovableTiles(game));
  const [wordList] = useWordList();

  useEffect(() => {
    updateTiles(makeMovableTiles(game));
  }, [game.myTiles]);

  const moveTile = (id, [x, y]) => {
    if (getItemByLoc(tiles, [x, y])) return;
    if (getItemByLoc(getStaticTiles(game), [x, y])) return;
    updateTiles(tiles => tiles.map(tile => (tile.id === id ? { ...tile, loc: [x, y] } : { ...tile })));
  };

  const recallTiles = () => {
    updateTiles(tiles => tiles.map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  const shuffleTiles = () => {
    updateTiles(tiles => [...tiles].sort(() => Math.random() - 0.5).map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  const deployedTiles = tiles.filter(t => t.loc[1] !== 'TRAY');

  const evaluateMove = () => {
    if (!deployedTiles.length) return null;
    try {
      const result = scoreMove(game, deployedTiles, wordList);
      return { result };
    } catch (e) {
      return { error: e };
    }
  };

  const value = {
    tiles,
    deployedTiles,
    recallTiles,
    shuffleTiles,
    moveTile,
    moveStatus: evaluateMove(),
  };

  return <CurrentMoveContext.Provider value={value} {...props} />;
}

export const useCurrentMove = () => useContext(CurrentMoveContext);
