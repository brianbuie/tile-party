import { Box } from '~/ui';
import { Draggable, DropZone } from '~/game/DragDrop';
import useGameSettings from '~/game/utils/useGameSettings';
import Tile from '~/game/Tile';
import { useCurrentMove } from '~/game/CurrentMove';

export default function Tray() {
  const { getMovableTile, registerDropZone, onDragEnd } = useCurrentMove();
  const { traySpots, traySpotSize, getLetterValue, avgTileSize } = useGameSettings();

  return (
    <Box row h_around pad='1rem 0 0'>
      {traySpots.map((_, key) => {
        const movableTile = getMovableTile([key, 'TRAY']);
        return (
          <Box.Square key={key} size={traySpotSize + '%'}>
            <DropZone loc={[key, 'TRAY']} register={registerDropZone} absolute='0' z='10'>
              {movableTile && (
                <Draggable
                  id={movableTile.id}
                  dragScale={avgTileSize / traySpotSize}
                  onDragEnd={(e, { point }) => onDragEnd(movableTile.id, point)}
                  z='50'
                >
                  <Tile letter={movableTile.letter} value={getLetterValue(movableTile.letter)} />
                </Draggable>
              )}
            </DropZone>
          </Box.Square>
        );
      })}
    </Box>
  );
}
