import { formatDistanceToNow, parseISO } from "date-fns";

export const getPlayers = game => [...game.players].sort((a, z) => a.sort - z.sort);

export const whosTurn = game => {
  if (game.complete) return null;
  const players = getPlayers(game);
  const lastPlayed = game.moveHistory?.[game.moveHistory.length - 1]?.playerId;
  if (!lastPlayed) return players[0].id;
  const lastKey = players.findIndex(p => p.id === lastPlayed);
  const nextPlayer = players[lastKey + 1];
  return nextPlayer?.id || players[0].id;
};

export const isPlayerTurn = (game, playerId) => whosTurn(game) === playerId;

export const getOpponents = (game, meId) => getPlayers(game).filter(p => p.id !== meId);

export const getGameName = (game, meId, nameLimit = 3) => {
  if (game.name) return game.name;
  const opponents = getOpponents(game, meId);
  const name = opponents
    .slice(0, nameLimit)
    .map(p => p.name)
    .join(", ");
  const remaining = opponents.length - nameLimit;
  const plusAmt = remaining > 0 ? ` + ${remaining}` : "";
  return name + plusAmt;
};

export const getPlayerScore = (game, playerId) => game.players.find(p => p.id === playerId).score;

export const getTopOpponentScore = (game, meId) => getOpponents(game, meId).sort((a, z) => z.score - a.score)[0].score;

export const getLastMove = game => game.moveHistory[game.moveHistory.length - 1];

export const getLastMovePlayer = game => {
  const lastMove = getLastMove(game);
  return game.players.find(p => p.id === lastMove.playerId);
};

export const getLastMoveDescription = game => {
  const move = getLastMove(game);
  return `played ${move.word} for ${move.points} points`;
};

export const getTimeSinceLastMove = game => {
  const lastMove = getLastMove(game);
  return formatDistanceToNow(parseISO(lastMove.created)) + " ago";
};
