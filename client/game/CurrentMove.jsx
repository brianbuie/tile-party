import React, { useContext } from 'react';
import { useActiveGame } from '~/game/ActiveGame';
import useMovableTiles from '~/game/utils/useMovableTiles';
import { useDragDrop } from '~/game/DragDrop';
import evaluateMove from '~/game/utils/evaluateMove';

const CurrentMoveContext = React.createContext({});

export default function CurrentMoveProvider(props) {
  const game = useActiveGame();
  if (!game) return null;
  const { staticTiles } = game;
  const { getMovableTile, deployedTiles, recallTiles, shuffleTiles, moveTile } = useMovableTiles(game.myTiles);

  if (deployedTiles.length) {
    const result = evaluateMove(staticTiles, deployedTiles);
    console.log(result);
  }

  const { registerDropZone, findDropZone } = useDragDrop();
  const onDragEnd = (id, point) => {
    const { loc } = findDropZone(point) || {};
    if (loc) moveTile(id, loc);
  };

  const value = {
    staticTiles,
    getMovableTile,
    deployedTiles,
    recallTiles,
    shuffleTiles,
    moveTile,
    registerDropZone,
    findDropZone,
    onDragEnd,
  };

  return <CurrentMoveContext.Provider value={value} {...props} />;
}

export const useCurrentMove = () => useContext(CurrentMoveContext);
