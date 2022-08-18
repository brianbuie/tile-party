import friendly from '~/game/config/friendly';

const gameModes = {
  FRIENDLY: friendly,
};

export default function useGameMode(gameMode) {
  const { tilesPerTurn, tiles } = gameModes[gameMode];

  const getLetterValue = letter => tiles[letter][0];

  return { tilesPerTurn, getLetterValue };
}
