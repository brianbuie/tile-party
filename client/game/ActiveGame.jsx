import React, { useContext } from 'react';
import { Box } from '~/ui';
import ScoreBoard from '~/game/ScoreBoard';
import CurrentMoveProvider from '~/game/CurrentMove';
import { DragDropProvider } from '~/game/DragDrop';
import Board from '~/game/Board';
import GameMenu from '~/game/GameMenu';

const ActiveGameContext = React.createContext({});
export const useActiveGame = () => useContext(ActiveGameContext);

export default function ActiveGame({ game }) {
  if (!game) return null;

  const value = game;

  return (
    <ActiveGameContext.Provider value={value}>
      <Box col v_around>
        <ScoreBoard />
        <CurrentMoveProvider>
          <DragDropProvider>
            <Board />
            <GameMenu />
          </DragDropProvider>
        </CurrentMoveProvider>
      </Box>
    </ActiveGameContext.Provider>
  );
}
