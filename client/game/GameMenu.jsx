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
      <MenuButton>
        <Icon.Burger />
        <span>More</span>
      </MenuButton>
      <MenuButton>
        <Icon.Pass />
        <span>Pass</span>
      </MenuButton>
      <Button.Primary disabled={!anyTilesDeployed}>Submit</Button.Primary>
      <MenuButton>
        <Icon.Swap />
        <span>Swap</span>
      </MenuButton>
      {anyTilesDeployed ? (
        <MenuButton onClick={recallTiles}>
          <Icon.Recall />
          <span>Recall</span>
        </MenuButton>
      ) : (
        <MenuButton onClick={shuffleTiles}>
          <Icon.Shuffle />
          <span>Shuffle</span>
        </MenuButton>
      )}
    </Box>
  );
}
