import { Box, Face, Icon, Text } from '~/ui';
import { getPlayersMeLast, getPlayerScore, isPlayerTurn, getWinningPlayerId } from '~/game/utils/gameHelpers';
import { useActiveGame } from '~/game/ActiveGame';
import { useMe } from '~/utils/useQuery';

export default function ScoreBoard() {
  const game = useActiveGame();
  const [me] = useMe();
  if (!game || !me) return null;
  return (
    <Box row v_center h_around>
      {getPlayersMeLast(game, me.id).map(player => (
        <Box col rounded='1.5rem' key={player.id} pad='1rem 2rem' faded={!isPlayerTurn(game, player.id)}>
          <Box col h_center height='1.5rem'>
            {getWinningPlayerId(game) === player.id && <Icon.Crown height='1rem' color='var(--crown-gold)' />}
          </Box>
          <Face size='3rem' user={player} variant={isPlayerTurn(game, player.id) ? 'highlight' : 'muted'} />
          <Box col h_center margin='0.75rem 0 0 0'>
            <Text.Score xl>{getPlayerScore(game, player.id)}</Text.Score>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
