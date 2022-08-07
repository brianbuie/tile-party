import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { useFetch } from "~/utils/useFetch";
import { Box, Icon, Link, Face, Headline, Text, Button } from "~/ui";

const GameItem = styled(Box).attrs({
  as: RouterLink,
})`
  border-radius: 0.5rem;
  &:hover {
    background: ${({ theme }) => theme.colors.lightOverlay};
  }
`;

const GameListing = ({ active }) => (
  <GameItem to="/game/mock" row rounded bkg={active && "lightOverlay"} pad="0.75rem" width="100%">
    <Face size="3rem" user={{ image: "https://cataas.com/cat?width=50&height=50" }} />
    <Box grow col pad="0 0 0 0.75rem" align="start">
      <Headline md>Opponent Name</Headline>
      <Text xs thin italic color="textMuted">
        2 days ago
      </Text>
    </Box>
    <Box row>
      <Box col pad="0.5rem">
        <Headline lg>186</Headline>
      </Box>
      <Box col pad="0.5rem">
        <Headline lg>205</Headline>
      </Box>
    </Box>
    <Icon.ForwardArrow size="1rem" />
  </GameItem>
);

export default function GamesList() {
  const [games, loading] = useFetch("viewGames");

  return (
    !loading && (
      <Box col grow width="100%" justify="stretch" align="start">
        <Box pad="0 0 1rem 0">
          <Headline xl>Your Move</Headline>
        </Box>
        {Array(3)
          .fill()
          .map((game, key) => (
            <GameListing key={key} active={key === 0} />
          ))}
      </Box>
    )
  );
}
