import { useLayoutEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { Box } from '~/ui';

export const Draggable = ({ id, dragScale, ...props }) => {
  const motionProps = {
    layout: true,
    drag: true,
    transition: {
      duration: 0.25,
    },
    whileDrag: {
      scale: dragScale || 1,
      transition: 0.1,
      zIndex: 25,
    },
    dragMomentum: false,
    dragSnapToOrigin: true,
    key: id,
    layoutId: id,
    cursor: 'pointer',
  };
  return <Box.Animated {...motionProps} {...props} />;
};

export const DropZone = ({ loc, register, ...props }) => {
  const dropArea = useRef(null);

  const registerDropArea = () => {
    const area = dropArea?.current?.getBoundingClientRect();
    if (!area) console.log('No area for DropZone ', loc);
    register(loc, [area.x, area.x + area.width], [area.y, area.y + area.height]);
  };

  useLayoutEffect(() => {
    registerDropArea();
    // window.addEventListener("resize", debounce(registerDropArea, 400));
  }, []);

  return <Box ref={dropArea} {...props} />;
};

export const useDragDrop = () => {
  const [dropZones, setDropZones] = useState({});

  const registerDropZone = (loc, xRange, yRange) =>
    setDropZones(dropZones => ({
      ...dropZones,
      [loc.join('_')]: { loc, xRange, yRange },
    }));

  const findDropZone = ({ x, y }) =>
    Object.values(dropZones).find(
      ({ xRange, yRange }) => x > xRange[0] && x < xRange[1] && y > yRange[0] && y < yRange[1]
    );

  return { registerDropZone, findDropZone };
};
