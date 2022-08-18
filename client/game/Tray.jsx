import { Box } from '~/ui';
import Tile from '~/game/Tile';
import { Draggable } from '~/game/BoardActive';
import { useActiveGame } from '~/game/ActiveGame';
import useBoardLayout from '~/game/utils/useBoardLayout';
import useGameMode from '~/game/utils/useGameMode';
import { useCurrentMove } from '~/game/CurrentMove';

export default function Tray() {
  const game = useActiveGame();
  if (!game) return null;
  const { getMovableTile, moveTile } = useCurrentMove();
  const { trayLayout, boardSpotSize } = useBoardLayout(game.settings.boardLayout);
  const { tilesPerTurn, getLetterValue } = useGameMode(game.settings.gameMode);
  const { traySpots, traySpotSize } = trayLayout(tilesPerTurn);
  const avgTileSize = (traySpotSize + boardSpotSize) / 2;
  const dragScale = avgTileSize / traySpotSize;

  return (
    <Box row h_around pad='1rem 0 0'>
      {traySpots.map((_, key) => {
        const movableTile = getMovableTile([key, 'TRAY']);
        return (
          <Box.Square key={key} size={traySpotSize + '%'}>
            {movableTile && (
              <Draggable row absolute='0' id={movableTile.id} dragScale={dragScale} z='20'>
                <Tile
                  letter={movableTile.letter}
                  value={getLetterValue(movableTile.letter)}
                  size={traySpotSize + '%'}
                />
              </Draggable>
            )}
          </Box.Square>
        );
      })}
    </Box>
  );
}
