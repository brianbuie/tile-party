import styled from "styled-components";
import { Box, Face, Icon, Score } from "~/ui";
import { getPlayersMeLast, getPlayerScore, isPlayerTurn, getWinningPlayerId } from "~/game/gameHelpers";

const Highlighted = styled(Box)`
  border-width: 3px;
  border-style: solid;
  border-color: ${({ active, theme }) => (active ? theme.colors.pink : "transparent")};
  box-shadow: ${({ active }) => (active ? `0 0 3rem rgba(235, 151, 255, 0.5)` : "none")};
`;

export default function ScoreBoard({ game, me }) {
  console.log(game.players.map(p => p.name).join(", "));
  return (
    <Box row grow align="center" justify="space-around">
      {getPlayersMeLast(game, me.id).map(player => (
        <Box col rounded key={player.id} pad="1rem 2rem" bkg={isPlayerTurn(game, player.id) && "lightOverlay"}>
          <Box height="1.5rem">{getWinningPlayerId(game) === player.id && <Icon.Crown height="1rem" color="rgb(253, 206, 130)" />}</Box>
          <Highlighted rounded="full" active={isPlayerTurn(game, player.id)}>
            <Face size="3rem" user={player} />
          </Highlighted>
          <Box margin="0.75rem 0 0 0">
            <Score xl>{getPlayerScore(game, player.id)}</Score>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
