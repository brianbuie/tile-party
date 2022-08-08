import styled from "styled-components";
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
        <Faces size="3rem" users={opponents} />
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

export default function GamesList() {
  const [games, loading] = useFetch("viewGames");
  console.log(games);
  return (
    !loading &&
    games && (
      <Box col grow width="100%" justify="stretch" align="start" pad="0 1rem">
        <Box pad="2.5rem 0 1rem 0">
          <Headline xl>Your Turn</Headline>
        </Box>
        {games.available.map((game, key) => (
          <GameListing key={game.id} active={key === 0} {...game} />
        ))}
        <Box pad="2.5rem 0 1rem 0">
          <Headline xl>Their Turn</Headline>
        </Box>
        {games.waiting.map(game => (
          <GameListing key={game.id} muted {...game} />
        ))}
        <Box pad="2.5rem 0 1rem 0">
          <Headline xl>Finished</Headline>
        </Box>
        {games.finished.map(game => (
          <GameListing key={game.id} muted {...game} />
        ))}
      </Box>
    )
  );
}
