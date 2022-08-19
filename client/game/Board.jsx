import { Box } from '~/ui';
import { Draggable, DropZone } from '~/game/DragDrop';
import useGameSettings from '~/game/utils/useGameSettings';
import BoardSpot from '~/game/BoardSpot';
import Tile from '~/game/Tile';
import { useCurrentMove } from '~/game/CurrentMove';

export default function Board() {
  const { getStaticTile, getSurroundingTiles, getMovableTile, registerDropZone, onDragEnd } = useCurrentMove();
  const { cols, rows, boardSpotSize, getSpot, getLetterValue, avgTileSize } = useGameSettings();

  return (
    <Box col bkg='var(--spot-outline)' pad='0.25rem' rounded='1.5%'>
      {rows.map((_, y) => (
        <Box row key={y}>
          {cols.map((_, x) => {
            const staticTile = getStaticTile([x, y]);
            const movableTile = getMovableTile([x, y]);
            return (
              <Box.Square key={x} size={boardSpotSize + '%'}>
                <BoardSpot {...getSpot([x, y])} absolute='0' z='4' />
                {staticTile ? (
                  <Box absolute='0' z='5'>
                    <Tile
                      surroundingTiles={getSurroundingTiles([x, y])}
                      letter={staticTile.letter}
                      value={getLetterValue(staticTile.letter)}
                      isLastMove={staticTile.isLastMove}
                    />
                  </Box>
                ) : (
                  <DropZone loc={[x, y]} register={registerDropZone} absolute='0' z='6'>
                    {movableTile && (
                      <Draggable
                        id={movableTile.id}
                        dragScale={avgTileSize / boardSpotSize}
                        onDragEnd={(e, { point }) => onDragEnd(movableTile.id, point)}
                        z='20'
                      >
                        <Tile letter={movableTile.letter} value={getLetterValue(movableTile.letter)} />
                      </Draggable>
                    )}
                  </DropZone>
                )}
              </Box.Square>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
