import React, { useContext } from 'react';

const ActiveGameContext = React.createContext({});

export default function ActiveGameProvider({ game, ...props }) {
  if (!game) return null;
  return <ActiveGameContext.Provider value={game} {...props} />;
}

export const useActiveGame = () => useContext(ActiveGameContext);
