import React, { useContext } from 'react';

const ActiveGameContext = React.createContext({});

export default function ActiveGame({ game, children }) {
  if (!game) return null;
  return <ActiveGameContext.Provider value={game}>{children}</ActiveGameContext.Provider>;
}

export const useActiveGame = () => {
  const game = useContext(ActiveGameContext);
  return game;
};
