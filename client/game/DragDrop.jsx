import { useLayoutEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import { SquareInner } from "~/ui/Box";

const Movable = motion(SquareInner);

export const Draggable = ({ children, id, dragScale, dragConstraints, ...props }) => {
  const motionProps = {
    ...props,
    layout: true,
    drag: true,
    transition: {
      duration: 0.25,
    },
    whileDrag: { scale: dragScale, transition: 0.1 },
    dragMomentum: false,
    key: id,
    layoutId: id,
    z: "30",
    cursor: "pointer",
  };
  return <Movable {...motionProps}>{children}</Movable>;
};

export const DropZone = ({ loc, register, children, ...props }) => {
  const dropArea = useRef(null);

  const registerDropArea = () => {
    const area = dropArea?.current.getBoundingClientRect();
    if (!area) console.log("No area for DropZone ", loc);
    register(loc, [area.x, area.x + area.width], [area.y, area.y + area.height]);
  };

  useLayoutEffect(() => {
    registerDropArea();
    window.addEventListener("resize", debounce(registerDropArea, 400));
  }, []);

  return (
    <SquareInner ref={dropArea} {...props}>
      {children}
    </SquareInner>
  );
};

export const useDragDrop = () => {
  const [dropZones, setDropZones] = useState({});

  const registerDropZone = (loc, xRange, yRange) => setDropZones(dropZones => ({ ...dropZones, [loc.join("_")]: { loc, xRange, yRange } }));

  const findDropZone = ({ x, y }) => {
    return Object.values(dropZones).find(({ xRange, yRange }) => {
      if (!x || x < xRange[0] || x > xRange[1]) return false;
      if (!y || y < yRange[0] || y > yRange[1]) return false;
      return true;
    });
  };

  return { registerDropZone, findDropZone };
};
