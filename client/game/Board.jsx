import { Box, SquareOuter, SquareInner } from "~/ui";
import { Draggable, DropZone, useDragDrop } from "./DragDrop";
import Spot from "./Spot";
import Tile from "./Tile";
import Menu from "./Menu";
import useBoardLayout from "./config/useBoardLayout";
import useGameMode from "./config/useGameMode";
import useMoveHistory from "./useMoveHistory";
import useCurrentMove from "./useCurrentMove";

export default function Board({ boardLayout, gameMode, moveHistory, playerTiles }) {
  const { cols, rows, boardSpotSize, trayLayout, getSpot } = useBoardLayout(boardLayout);
  const { getLetterValue, tilesPerTurn } = useGameMode(gameMode);
  const { getStaticTile, getSurroundingTiles } = useMoveHistory(moveHistory);
  const { getMovableTile, anyTilesDeployed, recallTiles, shuffleTiles, moveTile } = useCurrentMove(playerTiles);
  const { traySpots, traySpotSize } = trayLayout(tilesPerTurn);
  const avgTileSize = (traySpotSize + boardSpotSize) / 2;

  const { registerDropZone, findDropZone } = useDragDrop();
  const onDragEnd = (id, point) => {
    const { loc } = findDropZone(point) || {};
    if (loc) moveTile(id, loc);
  };

  return (
    <>
      <Box col width="100%" maxWidth="60vh">
        {rows.map((_, y) => (
          <Box row key={y} width="100%">
            {cols.map((_, x) => {
              const staticTile = getStaticTile([x, y]);
              const movableTile = getMovableTile([x, y]);
              const spotInfo = getSpot([x, y]);
              return (
                <SquareOuter key={x} size={boardSpotSize + "%"}>
                  {staticTile ? (
                    <SquareInner z="5">
                      <Tile
                        surroundingTiles={getSurroundingTiles([x, y])}
                        letter={staticTile.letter}
                        value={getLetterValue(staticTile.letter)}
                        isLastMove={staticTile.isLastMove}
                      />
                    </SquareInner>
                  ) : (
                    <DropZone loc={[x, y]} register={registerDropZone} z="10">
                      {movableTile && (
                        <Draggable
                          id={movableTile.id}
                          dragScale={avgTileSize / boardSpotSize}
                          dragSnapToOrigin
                          onDragEnd={(e, { point }) => onDragEnd(movableTile.id, point)}
                          z="20"
                        >
                          <Tile letter={movableTile.letter} value={getLetterValue(movableTile.letter)} z="30" movable />
                        </Draggable>
                      )}
                    </DropZone>
                  )}
                  <Spot type={spotInfo.type} />
                </SquareOuter>
              );
            })}
          </Box>
        ))}
        <Box row justify="space-around" width="100%" pad="1rem 0 0">
          {traySpots.map((_, key) => {
            const movableTile = getMovableTile([key, "TRAY"]);
            return (
              <SquareOuter key={key} size={traySpotSize + "%"}>
                <DropZone loc={[key, "TRAY"]} register={registerDropZone} z="10">
                  {movableTile && (
                    <Draggable
                      id={movableTile.id}
                      dragScale={avgTileSize / traySpotSize}
                      dragSnapToOrigin
                      onDragEnd={(e, { point }) => onDragEnd(movableTile.id, point)}
                      z="20"
                    >
                      <Tile letter={movableTile.letter} value={getLetterValue(movableTile.letter)} z="50" />
                    </Draggable>
                  )}
                </DropZone>
              </SquareOuter>
            );
          })}
        </Box>
      </Box>
      <Box col width="100%" maxWidth="60vh">
        <Menu anyTilesDeployed={anyTilesDeployed} recall={recallTiles} shuffle={shuffleTiles} />
      </Box>
    </>
  );
}
