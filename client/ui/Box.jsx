import styled from "styled-components";
import { motion } from "framer-motion";

export const Box = styled.div`
  /* Layout */
  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  ${({ grow }) => grow && `flex-grow: ${grow === true ? 1 : grow};`}

  /* Size */
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ width }) => width && `width: ${width};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ square }) => square && `width: ${square}; height: ${square};`}

  /* Spacing */
  ${({ pad }) => pad && `padding: ${pad};`}
  ${({ margin }) => margin && `margin: ${margin};`}

  /* Position */
  ${({ position }) => position && `position: ${position};`}
  ${({ absoluteFill }) => absoluteFill && `position: absolute; top: 0; right: 0; bottom: 0; left: 0;`}
  ${({ absolute }) => absolute && `position: absolute; top: ${absolute[0]}; right: ${absolute[1]}; bottom: ${absolute[2]}; left: ${absolute[3]};`}
  ${({ fixed }) => fixed && `position: fixed; top: ${fixed[0]}; right: ${fixed[1]}; bottom: ${fixed[2]}; left: ${fixed[3]};`}

  /* Background */
  ${({ bkg, theme }) => bkg && `background: ${theme.colors[bkg] || bkg};`}
  ${({ bkgImage }) => bkgImage && `background-image: url(${bkgImage}); background-size: cover;`}

  /* Others */
  border-radius: ${({ rounded, theme }) => {
    if (!rounded) return "0";
    if (rounded === "full") return "9999px";
    if (Array.isArray(rounded)) return rounded.map(a => (a ? theme.borderRadius : "0")).join(" ");
    return theme.borderRadius;
  }};
  ${({ z }) => z && `z-index: ${z};`}
  ${({ cursor }) => cursor && `cursor: ${cursor};`}
`;

export const AnimatedBox = motion(Box);

export const Square = styled(Box)`
  position: relative;
  width: ${({ size }) => size || "100%"};
  padding-bottom: ${({ size }) => size || "100%"};
  > * {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;
