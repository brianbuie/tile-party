import { useState, useRef, useLayoutEffect } from 'react';
import { Box } from '~/ui';
import Tile from '~/game/Tile';
import { useCurrentMove } from '~/game/CurrentMove';
import { useActiveGame } from '~/game/ActiveGame';
import { getAbsolute, getItem } from '~/game/utils/locHelpers';

export const Draggable = ({ id, dragScale, ...props }) => {
  const motionProps = {
    layout: true,
    drag: true,
    transition: {
      duration: 0.1,
    },
    whileDrag: {
      scale: dragScale || 1,
      zIndex: 25,
    },
    dragElastic: 0,
    dragMomentum: false,
    dragSnapToOrigin: true,
    key: id,
    layoutId: id,
    cursor: 'pointer',
  };
  return <Box.Animated {...motionProps} {...props} />;
};

export default function MovableTiles() {
  const dropArea = useRef(null);
  const [locRange, setLocRange] = useState([]);
  const { boardSize, boardSpotSize, traySpotSize, getLetterValue, avgTileSize } = useActiveGame();
  const { moveTile, tiles } = useCurrentMove();

  useLayoutEffect(() => {
    const area = dropArea?.current?.getBoundingClientRect();
    setLocRange([
      [area.x, area.x + area.width],
      [area.y, area.y + area.height],
    ]);
  }, []);

  const onDragEnd = (id, { x, y }) => {
    const [xRange, yRange] = locRange;
    if (x < xRange[0] || x > xRange[1] || y < yRange[0] || y > yRange[1]) return;
    moveTile(id, [
      Math.floor(((x - xRange[0]) / (xRange[1] - xRange[0])) * boardSize[0]),
      Math.floor(((y - yRange[0]) / (yRange[1] - yRange[0])) * boardSize[1]),
    ]);
  };

  return (
    <Box ref={dropArea} absolute='0'>
      {tiles.map(({ id, letter, loc: [x, y] }) => {
        const size = y !== 'TRAY' ? boardSpotSize : traySpotSize;
        const absolute = getAbsolute([x, y], size);
        const scale = avgTileSize / size;
        const drop = (e, { point }) => onDragEnd(id, point);
        return (
          <Draggable id={id} key={id} dragScale={scale} absolute={absolute} onDragEnd={drop}>
            <Tile letter={letter} value={getLetterValue(letter)} />
          </Draggable>
        );
      })}
    </Box>
  );
}
