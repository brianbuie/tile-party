import { useState, useRef, useLayoutEffect, useContext, createContext } from 'react';

const DragDropContext = createContext({});

export const DragDropProvider = props => {
  const [dropZones, setDropZones] = useState({});

  const registerDropZone = (id, ref, divisions) => {
    setDropZones(dropZones => ({
      ...dropZones,
      [id]: { id, ref, divisions },
    }));
  };

  const value = {
    registerDropZone,
    dropZones,
  };

  return <DragDropContext.Provider value={value} {...props} />;
};

export const useDropZone = (id, divisions = [1, 1]) => {
  const { registerDropZone } = useContext(DragDropContext);
  const ref = useRef(null);

  useLayoutEffect(() => {
    registerDropZone(id, ref, divisions);
  }, [id]);

  return ref;
};

export const useDrop = () => {
  const { dropZones } = useContext(DragDropContext);

  // prettier-ignore
  const getZonesDroppedIn = ({ x, y }) => Object.values(dropZones)
		.map(({ id, ref, divisions }) => {
			const { x, y, width, height } = ref.current?.getBoundingClientRect() || {};
			return { id, range: [[x, x + width], [y, y + height]], divisions };
		})
		.filter(({ range: [[x0, x1], [y0, y1]] }) => x > x0 && x < x1 && y > y0 && y < y1)
		.map(({ id, range: [[x0, x1], [y0, y1]], divisions: [xD, yD] }) => ({
			zone: id,
			loc: [Math.floor(((x - x0) / (x1 - x0)) * xD), Math.floor(((y - y0) / (y1 - y0)) * yD)]
		}));

  return getZonesDroppedIn;
};
