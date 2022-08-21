import { Box } from '~/ui';
import Tile from '~/game/Tile';
import { useCurrentMove } from '~/game/CurrentMove';
import { useActiveGame } from '~/game/ActiveGame';
import { useDropZone, useDrop } from '~/game/DragDrop';
import { getAbsoluteLoc } from '~/game/utils/locHelpers';

const MovableTile = ({ id, letter }) => {
  const { getLetterValue } = useActiveGame();
  const { moveTile } = useCurrentMove();
  const getLocInDropZone = useDrop();

  const onDragEnd = (e, { point }) => {
    const { zone, loc } = getLocInDropZone(point);
    if (!zone) return;
    if (zone === 'BOARD') return moveTile(id, loc);
    moveTile(id, [loc[0], 'TRAY']);
  };

  const props = {
    onDragEnd,
    layout: true,
    drag: true,
    transition: {
      duration: 0.2,
    },
    whileDrag: {
      scale: 1.2,
      zIndex: 25,
    },
    dragMomentum: false,
    dragElastic: 0,
    dragSnapToOrigin: true,
    key: id,
    layoutId: id,
    cursor: 'pointer',
  };
  return (
    <Box.Animated {...props}>
      <Tile letter={letter} value={getLetterValue(letter)} />
    </Box.Animated>
  );
};

export const DeployedTiles = () => {
  const { boardSpotSize, boardSize } = useActiveGame();
  const dropZoneRef = useDropZone('BOARD', boardSize);
  const { tiles } = useCurrentMove();
  const deployedTiles = tiles.filter(t => t.loc[1] !== 'TRAY');

  return (
    <Box absolute ref={dropZoneRef}>
      {deployedTiles.map(({ loc, id, letter }) => (
        <Box key={id} absolute={getAbsoluteLoc(loc, boardSpotSize)}>
          <MovableTile id={id} letter={letter} />
        </Box>
      ))}
    </Box>
  );
};

export const Tray = () => {
  const { tiles } = useCurrentMove();
  const { tilesPerTurn, traySpotSize } = useActiveGame();
  const trayDropZone = useDropZone('TRAY', [tilesPerTurn, 1]);
  const traySpots = [...Array(tilesPerTurn)].map((_, x) => x);

  return (
    <Box row h_around ref={trayDropZone}>
      {traySpots.map(k => (
        <Box width={traySpotSize * 0.95} key={k}>
          {tiles[k] && tiles[k].loc[1] === 'TRAY' && <MovableTile {...tiles[k]} />}
        </Box>
      ))}
    </Box>
  );
};
