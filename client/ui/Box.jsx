import styled from "styled-components";

const Box = styled.div`
  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  height: ${({ height, square }) => height || square || "auto"};
  width: ${({ width, square }) => width || square || "auto"};
  max-width: ${({ maxWidth }) => maxWidth || "none"};
  padding: ${({ pad }) => pad || "0"};
  margin: ${({ margin }) => margin || "0"};
  z-index: ${({ z }) => z || "auto"};
  flex-grow: ${({ grow }) => (grow === true ? "1" : grow || "0")};
  background: ${({ bkg, theme }) => theme.colors[bkg] || bkg || "transparent"};
  position: ${({ absoluteFill, position }) => (absoluteFill ? "absolute" : position || "relative")};
  ${({ absoluteFill }) => absoluteFill && `top: 0; right: 0; bottom: 0; left: 0;`}
  ${({ absolutePos }) =>
    absolutePos &&
    `top: ${absolutePos[0]}; right: ${absolutePos[1]}; bottom: ${absolutePos[2]}; left: ${absolutePos[3]};`}
  border-radius: ${({ rounded, theme }) => {
    if (!rounded) return "0";
    if (Array.isArray(rounded)) return rounded.map((a) => (a ? theme.borderRadius : "0")).join(" ");
    return theme.borderRadius;
  }};
`;

export default Box;

export const SquareOuter = styled(Box)`
  position: relative;
  width: ${({ size }) => size || "100%"};
  padding-bottom: ${({ size }) => size || "100%"};
`;

export const SquareInner = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: stretch;
  > * {
    flex-grow: 1;
  }
`;
