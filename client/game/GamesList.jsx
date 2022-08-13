import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Box, Faces, Icon, Text } from "~/ui";
import { getOpponents, getGameName, getTimeSinceLastMove, getTopOpponentScore, getPlayerScore, isPlayerTurn } from "~/game/gameHelpers";

const BoxLink = styled(Box).attrs({ as: RouterLink })`
  width: 100%;
  text-decoration: none;
`;

const HoverBackground = styled(Box)`
  &:hover {
    background: ${({ theme }) => theme.colors.overlayLight};
  }
`;

const GameListing = ({ active, game, muted, me }) => {
  const myScore = getPlayerScore(game, me.id);
  const opponentScore = getTopOpponentScore(game, me.id);
  return (
    <BoxLink to={`/game/${game.id}`}>
      <HoverBackground row h_left rounded="1rem" bkg={active && "overlayLight"} pad="0.75rem">
        <Box faded={muted}>
          <Faces size="3rem" users={getOpponents(game, me.id)} />
        </Box>
        <Box col h_left v_between grow pad="0.25rem 0.75rem">
          <Text.Strong muted={muted}>{getGameName(game, me.id, 2)}</Text.Strong>
          <Text.Em muted>{getTimeSinceLastMove(game)}</Text.Em>
        </Box>
        <Box row v_bottom h_between pad="0.25rem 0" width="25%">
          <Box col h_center width="50%">
            {opponentScore > myScore && <Icon.Crown color={muted ? "textMuted" : "crownGold"} height="0.6rem" />}
            <Text.Score muted={muted}>{opponentScore}</Text.Score>
          </Box>
          <Box col h_center width="50%">
            {opponentScore < myScore && <Icon.Crown color={muted ? "textMuted" : "crownGold"} height="0.6rem" />}
            <Text.Score muted={muted}>{myScore}</Text.Score>
          </Box>
        </Box>
      </HoverBackground>
    </BoxLink>
  );
};

export default function GamesList({ games, activeGameId, me }) {
  const lists = [
    {
      title: "Your Turn",
      filter: (g, me) => isPlayerTurn(g, me.id),
    },
    {
      title: "Their Turn",
      filter: (g, me) => !g.complete && !isPlayerTurn(g, me.id),
      muted: true,
    },
    {
      title: "Finished",
      filter: g => g.complete,
      muted: true,
    },
  ];

  return (
    games?.length && (
      <Box col h_left grow width="100%" pad="0 1rem">
        {lists.map(({ title, filter, muted }) => {
          const matchingGames = games.filter(g => filter(g, me));
          return (
            matchingGames.length && (
              <React.Fragment key={title}>
                <Box pad="2.5rem 0 1rem 0">
                  <Text.H2>{title}</Text.H2>
                </Box>
                {matchingGames.map(game => (
                  <GameListing key={game.id} active={activeGameId === game.id} game={game} muted={muted} me={me} />
                ))}
              </React.Fragment>
            )
          );
        })}
      </Box>
    )
  );
}
