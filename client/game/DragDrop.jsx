import { useState, useRef, useLayoutEffect, useContext, createContext } from 'react';

const DragDropContext = createContext({});

export const DragDropProvider = props => {
  const [dropZones, setDropZones] = useState({});

  const registerDropZone = (id, xRange, yRange, divisions) => {
    setDropZones(dropZones => ({
      ...dropZones,
      [id]: { id: id, range: [xRange, yRange], divisions },
    }));
  };

  const value = {
    registerDropZone,
    dropZones,
  };

  return <DragDropContext.Provider value={value} {...props} />;
};

export const useDropZone = (id, divisions = [1, 1]) => {
  const dropZoneRef = useRef(null);
  const { registerDropZone } = useContext(DragDropContext);

  useLayoutEffect(() => {
    const { x, y, width, height } = dropZoneRef?.current?.getBoundingClientRect() || {};
    registerDropZone(id, [x, x + width], [y, y + height], divisions);
  }, [id]);

  return dropZoneRef;
};

export const useDrop = () => {
  const { dropZones } = useContext(DragDropContext);

  const getLocInDropZone = ({ x, y }) => {
    const { id, range, divisions } =
      Object.values(dropZones).find(({ range: [[x0, x1], [y0, y1]] }) => x > x0 && x < x1 && y > y0 && y < y1) || {};
    if (!id) return {};
    const [[x0, x1], [y0, y1]] = range;
    const [xD, yD] = divisions;
    return { zone: id, loc: [Math.floor(((x - x0) / (x1 - x0)) * xD), Math.floor(((y - y0) / (y1 - y0)) * yD)] };
  };

  return getLocInDropZone;
};
