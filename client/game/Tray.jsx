import { Box } from '~/ui';
import { Draggable, DropZone } from '~/game/DragDrop';
import Tile from '~/game/Tile';
import { getAbsolute } from '~/game/utils/locHelpers';
import { useCurrentMove } from '~/game/CurrentMove';
import { useActiveGame } from '~/game/ActiveGame';

export default function Tray() {
  const { getMovableTile, registerDropZone, onDragEnd } = useCurrentMove();
  const { traySpots, traySpotSize, getLetterValue, avgTileSize } = useActiveGame();

  return traySpots.map((_, x) => {
    const movableTile = getMovableTile([x, 'TRAY']);
    const [t, r, b, l] = getAbsolute([x, 0], traySpotSize);
    const absolute = [t + 103, r, b + 103 + traySpotSize, l];
    return (
      <DropZone loc={[x, 'TRAY']} register={registerDropZone} key={`${x}_TRAY`} absolute={absolute}>
        {movableTile && (
          <Draggable
            id={movableTile.id}
            dragScale={avgTileSize / traySpotSize}
            onDragEnd={(e, { point }) => onDragEnd(movableTile.id, point)}
          >
            <Tile letter={movableTile.letter} value={getLetterValue(movableTile.letter)} />
          </Draggable>
        )}
      </DropZone>
    );
  });
}
