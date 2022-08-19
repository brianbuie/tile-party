import { useCurrentMove } from '~/game/CurrentMove';
import { Box, Button, Icon } from '~/ui';

export default function GameMenu() {
  const { deployedTiles, recallTiles, shuffleTiles } = useCurrentMove();
  const anyTilesDeployed = !!deployedTiles.length;
  return (
    <Box col v_center>
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
    </Box>
  );
}
