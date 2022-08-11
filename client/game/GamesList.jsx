import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Box, Faces, Headline, Icon, Text, Score } from "~/ui";
import { getOpponents, getGameName, getTimeSinceLastMove, getTopOpponentScore, getPlayerScore, isPlayerTurn } from "~/game/gameHelpers";

const BoxLink = styled(Box).attrs({ as: RouterLink })`
  width: 100%;
  text-decoration: none;
`;

const HoverBackground = styled(Box)`
  &:hover {
    background: ${({ theme }) => theme.colors.lightOverlay};
  }
`;

const GameListing = ({ active, game, muted, me }) => {
  const myScore = getPlayerScore(game, me.id);
  const opponentScore = getTopOpponentScore(game, me.id);
  return (
    <BoxLink to={`/game/${game.id}`}>
      <HoverBackground row stretch rounded="1rem" bkg={active && "lightOverlay"} pad="0.75rem" width="100%">
        <Box faded={muted}>
          <Faces size="3rem" users={getOpponents(game, me.id)} />
        </Box>
        <Box grow col pad="0.25rem 0.75rem" align="start" justify="space-between">
          <Headline md muted={muted}>
            {getGameName(game, me.id, 2)}
          </Headline>
          <Text xs thin italic muted>
            {getTimeSinceLastMove(game)}
          </Text>
        </Box>
        <Box row pad="0.25rem 0" align="end" justify="space-between" width="25%">
          <Box col width="50%">
            {opponentScore > myScore && <Icon.Crown color={muted ? "textMuted" : "gold"} height="0.6rem" />}
            <Score md muted={muted}>
              {opponentScore}
            </Score>
          </Box>
          <Box col width="50%">
            {opponentScore < myScore && <Icon.Crown color={muted ? "textMuted" : "gold"} height="0.6rem" />}
            <Score md muted={muted}>
              {myScore}
            </Score>
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
      <Box col grow width="100%" align="start" pad="0 1rem">
        {lists.map(({ title, filter, muted }) => {
          const matchingGames = games.filter(g => filter(g, me));
          return (
            matchingGames.length && (
              <React.Fragment key={title}>
                <Box pad="2.5rem 0 1rem 0">
                  <Headline xl>{title}</Headline>
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
