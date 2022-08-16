import { Box } from '~/ui';
import { Draggable, DropZone, useDragDrop } from './DragDrop';
import BoardSpots from '~/board/BoardSpots';
import StaticTiles from '~/board/StaticTiles';
import Tray from '~/game/Tray';
import useBoardLayout from './config/useBoardLayout';
import useGameMode from './config/useGameMode';
import useMoveHistory from './useMoveHistory';
import useCurrentMove from './useCurrentMove';

export default function Board() {
  return (
    <Box col v_center>
      <Box col bkg='var(--spot-outline)' pad='0.25rem' rounded='1.5%'>
        <Box.Square size='100%'>
          <Box z='10' absoluteFill>
            <BoardSpots />
          </Box>
          <Box z='20' absoluteFill>
            <StaticTiles />
          </Box>
        </Box.Square>
      </Box>
      <Tray />
    </Box>
  );
}

function Boardv1({ game }) {
  const { cols, rows, boardSpotSize, trayLayout, getSpot } = useBoardLayout(game.settings.boardLayout);
  const { getLetterValue, tilesPerTurn } = useGameMode(game.settings.gameMode);
  const { getStaticTile, getSurroundingTiles } = useMoveHistory(game.moveHistory);
  const { getMovableTile, anyTilesDeployed, recallTiles, shuffleTiles, moveTile } = useCurrentMove(game.myTiles);
  const { traySpots, traySpotSize } = trayLayout(tilesPerTurn);
  const avgTileSize = (traySpotSize + boardSpotSize) / 2;

  const { registerDropZone, findDropZone } = useDragDrop();
  const onDragEnd = (id, point) => {
    const { loc } = findDropZone(point) || {};
    if (loc) moveTile(id, loc);
  };

  return (
    <>
      <Box col v_center>
        {rows.map((_, y) => (
          <Box row key={y}>
            {cols.map((_, x) => {
              const staticTile = getStaticTile([x, y]);
              const movableTile = getMovableTile([x, y]);
              const spotInfo = getSpot([x, y]);
              return (
                <Box.Square key={x} size={boardSpotSize + '%'}>
                  {staticTile ? (
                    <Tile
                      surroundingTiles={getSurroundingTiles([x, y])}
                      letter={staticTile.letter}
                      value={getLetterValue(staticTile.letter)}
                      isLastMove={staticTile.isLastMove}
                      z='5'
                    />
                  ) : (
                    <DropZone loc={[x, y]} register={registerDropZone} z='10'>
                      {movableTile && (
                        <Draggable
                          id={movableTile.id}
                          dragScale={avgTileSize / boardSpotSize}
                          dragSnapToOrigin
                          onDragEnd={(e, { point }) => onDragEnd(movableTile.id, point)}
                          z='20'
                        >
                          <Tile letter={movableTile.letter} value={getLetterValue(movableTile.letter)} z='30' movable />
                        </Draggable>
                      )}
                    </DropZone>
                  )}
                  <Spot type={spotInfo.type} />
                </Box.Square>
              );
            })}
          </Box>
        ))}
        <Box row h_around pad='1rem 0 0'>
          {traySpots.map((_, key) => {
            const movableTile = getMovableTile([key, 'TRAY']);
            return (
              <Box.Square key={key} size={traySpotSize + '%'}>
                <DropZone loc={[key, 'TRAY']} register={registerDropZone} z='10'>
                  {movableTile && (
                    <Draggable
                      id={movableTile.id}
                      dragScale={avgTileSize / traySpotSize}
                      dragSnapToOrigin
                      onDragEnd={(e, { point }) => onDragEnd(movableTile.id, point)}
                      z='20'
                    >
                      <Tile letter={movableTile.letter} value={getLetterValue(movableTile.letter)} z='50' />
                    </Draggable>
                  )}
                </DropZone>
              </Box.Square>
            );
          })}
        </Box>
      </Box>
      <Box col v_center>
        <Menu anyTilesDeployed={anyTilesDeployed} recall={recallTiles} shuffle={shuffleTiles} />
      </Box>
    </>
  );
}
