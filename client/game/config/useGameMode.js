import friendly from "./friendly";

const OPTIONS = {
  FRIENDLY: friendly,
};

export default function useGameMode(optionName) {
  const { tilesPerTurn, tiles } = OPTIONS[optionName];

  const getLetterValue = letter => tiles[letter][0];

  return { tilesPerTurn, getLetterValue };
}
