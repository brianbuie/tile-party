import styled from 'styled-components';
import { Box, Face, Icon, Text } from '~/ui';
import { getPlayersMeLast, getPlayerScore, isPlayerTurn, getWinningPlayerId } from '~/game/gameHelpers';
import { useActiveGame } from '~/game/ActiveGame';
import { useMe } from '~/auth/RequireAuth';

const Highlighted = styled(Box)`
  border-width: 3px;
  border-style: solid;
  border-color: ${({ active, theme }) => (active ? theme.colors.primary : 'transparent')};
  box-shadow: ${({ active }) => (active ? `0 0 3rem rgba(235, 151, 255, 0.5)` : 'none')};
`;

export default function ScoreBoard() {
  const game = useActiveGame();
  const me = useMe();
  if (!game || !me) return null;
  return (
    <Box row v_center h_around>
      {getPlayersMeLast(game, me.id).map(player => (
        <Box col rounded="1.5rem" key={player.id} pad="1rem 2rem" bkg={isPlayerTurn(game, player.id) && 'overlayLight'}>
          <Box col h_center height="1.5rem">
            {getWinningPlayerId(game) === player.id && <Icon.Crown height="1rem" color="crownGold" />}
          </Box>
          <Highlighted rounded="full" active={isPlayerTurn(game, player.id)}>
            <Face size="3rem" user={player} />
          </Highlighted>
          <Box col h_center margin="0.75rem 0 0 0">
            <Text.Score xl>{getPlayerScore(game, player.id)}</Text.Score>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
