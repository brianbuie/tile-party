import { Box } from '~/ui';
import Tile from '~/board/Tile';
import { useActiveGame } from '~/game/ActiveGame';
import useBoardLayout from '~/board/config/useBoardLayout';
import useGameMode from '~/board/config/useGameMode';
import useCurrentMove from '~/board/useCurrentMove';

export default function Tray() {
  const game = useActiveGame();
  if (!game) return null;
  const { trayLayout } = useBoardLayout(game.settings.boardLayout);
  const { tilesPerTurn, getLetterValue } = useGameMode(game.settings.gameMode);
  const { traySpots, traySpotSize } = trayLayout(tilesPerTurn);
  const { getMovableTile, moveTile } = useCurrentMove(game.myTiles);

  return (
    <Box row h_around pad='1rem 0 0'>
      {traySpots.map((_, key) => {
        const movableTile = getMovableTile([key, 'TRAY']);
        return movableTile ? (
          <Tile
            letter={movableTile.letter}
            value={getLetterValue(movableTile.letter)}
            key={key}
            size={traySpotSize + '%'}
          />
        ) : (
          <Box.Square key={key} size={traySpotSize + '%'} />
        );
      })}
    </Box>
  );
}
