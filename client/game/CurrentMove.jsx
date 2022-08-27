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

  const deployedTiles = tiles.filter(t => t.loc[1] !== 'TRAY');

  const recallTiles = () => {
    updateTiles(tiles => tiles.map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  const shuffleTiles = () => {
    updateTiles(tiles => [...tiles].sort(() => Math.random() - 0.5).map((tile, x) => ({ ...tile, loc: [x, 'TRAY'] })));
  };

  if (deployedTiles.length) {
    try {
      const result = scoreMove(game, deployedTiles, wordList);
      const words = result.words.map(r => r.word).join(', ');
      console.log(`Play ${words} for ${result.score} points.`);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
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
