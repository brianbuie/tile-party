import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useFetch } from "~/utils/useFetch";
import { Box, Icon, Faces, Headline, Text, Score } from "~/ui";

const BoxLink = styled(Box).attrs({ as: RouterLink })`
  width: 100%;
  text-decoration: none;
`;

const GameItem = styled(Box)`
  &:hover {
    background: ${({ theme }) => theme.colors.lightOverlay};
  }
`;

const GameListing = ({ active, muted, id, opponents, otherScore, playerScore, timeSinceLastMove }) => {
  return (
    <BoxLink to={`/game/${id}`}>
      <GameItem row rounded="1rem" bkg={active && "lightOverlay"} pad="0.75rem" width="100%">
        <Box faded={muted}>
          <Faces size="3rem" users={opponents} />
        </Box>
        <Box grow col pad="0 0 0 0.75rem" align="start">
          <Headline md muted={muted}>
            {opponents
              .slice(0, 2)
              .map(p => p.name)
              .join(", ")}
          </Headline>
          <Text xs thin italic muted>
            {timeSinceLastMove}
          </Text>
        </Box>
        <Box row>
          <Box col pad="0.5rem">
            <Score md muted={muted}>
              {otherScore}
            </Score>
          </Box>
          <Box col pad="0.5rem">
            <Score md muted={muted}>
              {playerScore}
            </Score>
          </Box>
        </Box>
        <Icon.ForwardArrow size="1rem" />
      </GameItem>
    </BoxLink>
  );
};

const titles = {
  available: "Your Turn",
  waiting: "Their Turn",
  finised: "Finished",
};

const lists = [
  {
    key: "available",
    title: "Your Turn",
  },
  {
    key: "waiting",
    title: "Their Turn",
    muted: true,
  },
  {
    key: "finished",
    title: "Finished",
    muted: true,
  },
];

export default function GamesList() {
  const [games, loading] = useFetch("viewGames");
  const { gameId } = useParams();

  return (
    !loading &&
    games && (
      <Box col grow width="100%" justify="stretch" align="start" pad="0 1rem">
        {lists.map(
          ({ key, title, muted }) =>
            games[key]?.length && (
              <React.Fragment key={key}>
                <Box pad="2.5rem 0 1rem 0">
                  <Headline xl>{title}</Headline>
                </Box>
                {games[key].map(game => (
                  <GameListing key={game.id} active={gameId === game.id} muted={muted} {...game} />
                ))}
              </React.Fragment>
            )
        )}
      </Box>
    )
  );
}
