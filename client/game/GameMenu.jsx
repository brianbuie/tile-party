import { useCurrentMove } from '~/game/CurrentMove';
import { useActiveGame } from '~/game/ActiveGame';
import { displayCommas } from '@common/playerHelpers';
import { Box, Button, Icon, Text } from '~/ui';

export default function GameMenu() {
  const { deployedTiles, recallTiles, shuffleTiles, moveStatus } = useCurrentMove();
  const { tilesRemaining } = useActiveGame();

  const canRecall = !!deployedTiles.length;
  const canSubmit = moveStatus && !moveStatus.error;

  const makeStatusText = () => {
    if (!moveStatus) return `${tilesRemaining} Tiles Remaining`;
    if (moveStatus.error) return moveStatus.error;
    return `Play ${displayCommas(moveStatus.result.words)} for ${moveStatus.result.score} points.`;
  };

  return (
    <Box col>
      <Text center>{makeStatusText()}</Text>
      <Box row h_around pad='1rem 0'>
        <Button pad='0' size='1.5rem'>
          <Icon.Burger />
        </Button>
        <Button.Primary disabled={!canSubmit}>Submit</Button.Primary>
        {canRecall ? (
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
