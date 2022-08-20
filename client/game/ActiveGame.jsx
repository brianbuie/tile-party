import React, { useContext } from 'react';
import { Box } from '~/ui';
import ScoreBoard from '~/game/ScoreBoard';
import CurrentMoveProvider from '~/game/CurrentMove';
import { BoardSpots, StaticTiles } from '~/game/Board';
import MovableTiles from '~/game/MovableTiles';
import useGameSettings from '~/game/utils/useGameSettings';
import GameMenu from '~/game/GameMenu';

const ActiveGameContext = React.createContext({});
export const useActiveGame = () => useContext(ActiveGameContext);

export default function ActiveGame({ game }) {
  if (!game) return null;

  const staticTiles = game.moveHistory.reduce(
    (all, { tiles }, i, a) => [...all, ...tiles.map(t => ({ ...t, isLastMove: i === a.length - 1 }))],
    []
  );

  const { spots, boardSize, boardSpotSize, traySpots, traySpotSize, getLetterValue, avgTileSize } =
    useGameSettings(game);

  const value = {
    ...game,
    staticTiles,
    spots,
    boardSize,
    boardSpotSize,
    traySpots,
    traySpotSize,
    getLetterValue,
    avgTileSize,
  };

  return (
    <ActiveGameContext.Provider value={value}>
      <ScoreBoard />
      <Box col v_center>
        <Box col bkg='var(--spot-outline)' pad='0.25rem' rounded='1.5%'>
          <Box.Square>
            <BoardSpots />
            <StaticTiles />
            <CurrentMoveProvider>
              <MovableTiles />
              <GameMenu />
            </CurrentMoveProvider>
          </Box.Square>
        </Box>
        <Box pad='0 0 35% 0' />
      </Box>
    </ActiveGameContext.Provider>
  );
}
