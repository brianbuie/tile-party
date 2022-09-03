import { formatDistanceToNow, parseISO } from 'date-fns';

export const displayCommas = arr => {
  const len = arr.length;
  if (len === 1) return arr[0];
  if (len === 2) return `${arr[0]} and ${arr[1]}`;
  if (len > 2) return `${arr.slice(0, len - 1).join(', ')}, and ${arr[len - 1]}`;
};

/*
    Player utils
*/

const getPlayers = game =>
  game.playerDetails
    .map((details, k) => {
      const player = game.players.find(p => p.id === details.id) || { order: k + 1, score: 0 };
      return { ...player, ...details };
    })
    .sort((a, z) => a.order - z.order);

export const getOpponents = (game, meId) => getPlayers(game).filter(p => p.id !== meId);

export const getPlayersMeLast = (game, meId) => {
  const players = getPlayers(game);
  const myKey = players.findIndex(p => p.id === meId);
  const beforeMe = players.filter((_, key) => key < myKey);
  const afterMe = players.filter((_, key) => key > myKey);
  return [...afterMe, ...beforeMe, players[myKey]];
};

export const getPlayer = (game, playerId) => getPlayers(game).find(p => p.id === playerId);

export const getPlayerScore = (game, playerId) => getPlayer(game, playerId).score;

export const getTopOpponentScore = (game, meId) => getOpponents(game, meId).sort((a, z) => z.score - a.score)[0].score;

export const getTopScoringPlayerId = game => [...game.players].sort((a, z) => z.score - a.score)[0].id;

/*
    Turn
*/

export const getLastMove = game => game.moveHistory[game.moveHistory.length - 1];

export const whosTurn = game => {
  if (game.complete) return null;
  const players = getPlayers(game);
  const lastPlayerId = getLastMove(game)?.playerId;
  if (!lastPlayerId) return players[0].id;
  const lastMovePlayerKey = players.findIndex(p => p.id === lastPlayerId);
  const nextPlayer = players[lastMovePlayerKey + 1];
  return nextPlayer?.id || players[0].id;
};

export const isPlayerTurn = (game, playerId) => whosTurn(game) === playerId;

export const getLastMovePlayer = game => {
  const lastMove = getLastMove(game);
  return game.players.find(p => p.id === lastMove.playerId);
};

export const getLastMoveDescription = game => {
  const move = getLastMove(game);
  // TODO other move types
  return `played ${displayCommas(move.words)} for ${move.score} points`;
};

export const getTimeSinceLastMove = game => {
  const lastMove = getLastMove(game);
  return formatDistanceToNow(parseISO(lastMove.created)) + ' ago';
};

/*
    Game
*/
export const getGameName = (game, meId, nameLimit = 3) => {
  if (game.name) return game.name;
  const opponents = getOpponents(game, meId);
  const name = opponents
    .slice(0, nameLimit)
    .map(p => p.name)
    .join(', ');
  const remaining = opponents.length - nameLimit;
  const plusAmt = remaining > 0 ? ` + ${remaining}` : '';
  return name + plusAmt;
};

/*
    Score
*/

export const getStaticTiles = game => game.moveHistory.map(({ tiles }) => tiles).flat();
