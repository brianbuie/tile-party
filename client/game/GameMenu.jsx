import { useCurrentMove } from '~/game/CurrentMove';
import { Box, Button, Icon } from '~/ui';

export default function GameMenu() {
  const { deployedTiles, recallTiles, shuffleTiles } = useCurrentMove();
  return (
    <Box row h_around pad='1rem 0'>
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
