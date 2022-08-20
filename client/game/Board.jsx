import { Box } from '~/ui';
import { Draggable, DropZone } from '~/game/DragDrop';
import BoardSpot from '~/game/BoardSpot';
import Tile from '~/game/Tile';
import { useCurrentMove } from '~/game/CurrentMove';
import { useActiveGame } from '~/game/ActiveGame';
import { getAbsolute, getAllAdjacentItems, getItem } from '~/game/utils/locHelpers';

export const BoardSpots = () => {
  const game = useActiveGame();
  const { spots, boardSpotSize } = game;

  return spots.map(({ spotType, loc: [x, y] }) => (
    <Box key={`${x}_${y}`} absolute={getAbsolute([x, y], boardSpotSize)}>
      <BoardSpot spotType={spotType} />
    </Box>
  ));
};

export const StaticTiles = () => {
  const game = useActiveGame();
  const { staticTiles, boardSpotSize, getLetterValue } = game;

  return staticTiles.map(({ letter, isLastMove, loc: [x, y] }) => (
    <Box key={`${x}_${y}`} absolute={getAbsolute([x, y], boardSpotSize)}>
      <Tile
        surroundingTiles={getAllAdjacentItems(staticTiles, [x, y])}
        letter={letter}
        value={getLetterValue(letter)}
        isLastMove={isLastMove}
      />
    </Box>
  ));
};

export const MovableTiles = () => {
  const game = useActiveGame();
  const { staticTiles, deployedTiles, registerDropZone, onDragEnd } = useCurrentMove();
  const { spots, boardSpotSize, getLetterValue, avgTileSize } = game;

  return spots.map(({ loc: [x, y] }) => {
    const staticTile = getItem(staticTiles, [x, y]);
    const movableTile = getItem(deployedTiles, [x, y]);
    const absolute = getAbsolute([x, y], boardSpotSize);
    return !staticTile ? (
      <DropZone loc={[x, y]} register={registerDropZone} key={`${x}_${y}`} absolute={absolute}>
        {movableTile && (
          <Draggable
            id={movableTile.id}
            dragScale={avgTileSize / boardSpotSize}
            onDragEnd={(e, { point }) => onDragEnd(movableTile.id, point)}
          >
            <Tile letter={movableTile.letter} value={getLetterValue(movableTile.letter)} />
          </Draggable>
        )}
      </DropZone>
    ) : null;
  });
};
