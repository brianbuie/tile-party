import wordsWithFriends from "./wordsWithFriends";

const OPTIONS = {
  WORDSWITHFRIENDS: wordsWithFriends,
};

export default function useGameMode(optionName) {
  const { tilesPerTurn, tiles } = OPTIONS[optionName];

  const getLetterValue = (letter) => tiles[letter][0];

  return { tilesPerTurn, getLetterValue };
}
