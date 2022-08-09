import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Box, Icon, Faces, Headline, Text, Score, theme } from "~/ui";

const BoxLink = styled(Box).attrs({ as: RouterLink })`
  width: 100%;
  text-decoration: none;
`;

const HoverBackground = styled(Box)`
  &:hover {
    background: ${({ theme }) => theme.colors.lightOverlay};
  }
`;

const GameListing = ({ active, id, opponents, otherScore, myScore, myTurn, lastMove }) => {
  return (
    <BoxLink to={`/game/${id}`}>
      <HoverBackground row rounded="1rem" bkg={active && "lightOverlay"} pad="0.75rem" width="100%">
        <Box faded={!myTurn}>
          <Faces size="3rem" users={opponents} />
        </Box>
        <Box grow col pad="0 0 0 0.75rem" align="start">
          <Headline md muted={!myTurn}>
            {opponents
              .slice(0, 2)
              .map(p => p.name)
              .join(", ")}
          </Headline>
          <Text xs thin italic muted>
            {lastMove?.humanTimeSince}
          </Text>
        </Box>
        <Box row>
          <Box col pad="0.5rem">
            <Score md muted={!myTurn}>
              {otherScore}
            </Score>
          </Box>
          <Box col pad="0.5rem">
            <Score md muted={!myTurn}>
              {myScore}
            </Score>
          </Box>
        </Box>
        <Icon.ForwardArrow size="1rem" color={!myTurn ? theme.colors.textMuted : "white"} />
      </HoverBackground>
    </BoxLink>
  );
};

const lists = [
  {
    title: "Your Turn",
    filter: g => g.myTurn,
  },
  {
    title: "Their Turn",
    filter: g => !g.gameFinished && !g.myTurn,
  },
  {
    title: "Finished",
    filter: g => g.gameFinished,
  },
];

export default function GamesList({ games, activeGameId }) {
  return (
    games?.length && (
      <Box col grow width="100%" justify="stretch" align="start" pad="0 1rem">
        {lists.map(({ title, filter }) => {
          const _games = games.filter(filter);
          return (
            _games.length && (
              <React.Fragment key={title}>
                <Box pad="2.5rem 0 1rem 0">
                  <Headline xl>{title}</Headline>
                </Box>
                {_games.map(game => (
                  <GameListing key={game.id} active={activeGameId === game.id} {...game} />
                ))}
              </React.Fragment>
            )
          );
        })}
      </Box>
    )
  );
}
