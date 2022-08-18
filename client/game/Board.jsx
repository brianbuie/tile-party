import { Box } from '~/ui';
import { Draggable, DropZone, useDragDrop } from '~/game/DragDrop';
import useBoardLayout from '~/game/utils/useBoardLayout';
import useGameMode from '~/game/utils/useGameMode';
import useMoveHistory from '~/game/utils/useMoveHistory';
import useCurrentMove from '~/game/utils/useCurrentMove';
import BoardSpot from '~/game/BoardSpot';
import { useActiveGame } from '~/game/ActiveGame';
import GameMenu from '~/game/GameMenu';
import Tile from '~/game/Tile';

export default function Board() {
  const game = useActiveGame();
  if (!game) return null;
  const { cols, rows, boardSpotSize, trayLayout, getSpotType } = useBoardLayout(game.settings.boardLayout);
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
        <Box col bkg='var(--spot-outline)' pad='0.25rem' rounded='1.5%'>
          {rows.map((_, y) => (
            <Box row key={y}>
              {cols.map((_, x) => {
                const staticTile = getStaticTile([x, y]);
                const movableTile = getMovableTile([x, y]);
                return (
                  <Box.Square key={x} size={boardSpotSize + '%'}>
                    <BoardSpot type={getSpotType([x, y])} absolute='0' z='4' />
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
      </Box>
      <Box col v_center>
        <GameMenu anyTilesDeployed={anyTilesDeployed} recallTiles={recallTiles} shuffleTiles={shuffleTiles} />
      </Box>
    </>
  );
}
