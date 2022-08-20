import { useCurrentMove } from '~/game/CurrentMove';
import { useActiveGame } from '~/game/ActiveGame';
import { Box, Button, Icon } from '~/ui';

export default function GameMenu() {
  const { deployedTiles, recallTiles, shuffleTiles } = useCurrentMove();
  const { traySpotSize } = useActiveGame();
  const absolute = [100 + 1.5 * traySpotSize, 0, 'auto', 0];
  return (
    <Box row h_around absolute={absolute}>
      <Button pad='0' size='1.5rem'>
        <Icon.Burger />
      </Button>
      <Button.Primary disabled={!deployedTiles.length}>Submit</Button.Primary>
      {!!deployedTiles.length ? (
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
