import styled from "styled-components";
import { motion } from "framer-motion";
import { visibilityMixin, bkgMixin, sizeMixin, roundedMixin, spacingMixin } from "~/ui/styledMixins";

export const Box = styled.div`
  /* Align Children */
  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  ${({ stretch }) => stretch && "align-items: stretch;"}
  ${({ grow }) => grow && `flex-grow: ${grow === true ? 1 : grow};`}

  /* Position */
  ${({ position }) => position && `position: ${position};`}
  ${({ absolute }) => absolute && `position: absolute; top: ${absolute[0]}; right: ${absolute[1]}; bottom: ${absolute[2]}; left: ${absolute[3]};`}
  ${({ absoluteFill }) => absoluteFill && `position: absolute; top: 0; right: 0; bottom: 0; left: 0;`}
  ${({ fixed }) => fixed && `position: fixed; top: ${fixed[0]}; right: ${fixed[1]}; bottom: ${fixed[2]}; left: ${fixed[3]};`}
  ${({ fixedFill }) => fixedFill && `position: fixed; top: 0; right: 0; bottom: 0; left: 0;`}

  /* Size */
  ${sizeMixin}

  /* Spacing */
  ${spacingMixin}

  /* Cosmetics 💅 */
  ${bkgMixin}

  /* Rounded Corners */
  ${roundedMixin}

  /* Visibility 👀 */
  ${visibilityMixin}
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
