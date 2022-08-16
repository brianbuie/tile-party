import styled from 'styled-components';
import { Box, Button, Icon } from '~/ui';
import { useActiveGame } from '~/game/ActiveGame';
import useCurrentMove from '~/board/useCurrentMove';

const MenuButton = styled(Button).attrs({
  vertical: true,
  pad: '0',
  width: '15%',
})``;

export default function GameMenu() {
  const game = useActiveGame();
  if (!game) return null;
  const { anyTilesDeployed, recallTiles, shuffleTiles } = useCurrentMove(game.myTiles);
  return (
    <Box row h_around pad='1rem 0'>
      <Button pad='0' size='1.5rem'>
        <Icon.Burger />
      </Button>
      <Button.Primary disabled={!anyTilesDeployed}>Submit</Button.Primary>
      {anyTilesDeployed ? (
        <Button pad='0' size='1.5rem' onClick={recallTiles}>
          <Icon.Recall />
        </Button>
      ) : (
        <Button pad='0' size='1.5rem' onClick={shuffleTiles}>
          <Icon.Shuffle />
        </Button>
      )}
    </Box>
  );
}
