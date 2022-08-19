import React, { useContext } from 'react';
import { useActiveGame } from '~/game/ActiveGame';
import useStaticTiles from '~/game/utils/useStaticTiles';
import useMovableTiles from '~/game/utils/useMovableTiles';
import { useDragDrop } from '~/game/DragDrop';

const CurrentMoveContext = React.createContext({});

export default function CurrentMoveProvider(props) {
  const game = useActiveGame();
  if (!game) return null;
  const { getStaticTile, getSurroundingTiles } = useStaticTiles(game.moveHistory);
  const { getMovableTile, deployedTiles, recallTiles, shuffleTiles, moveTile } = useMovableTiles(game.myTiles);

  const { registerDropZone, findDropZone } = useDragDrop();
  const onDragEnd = (id, point) => {
    const { loc } = findDropZone(point) || {};
    if (loc) moveTile(id, loc);
  };

  const value = {
    getStaticTile,
    getSurroundingTiles,
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
