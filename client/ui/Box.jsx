import styled from "styled-components";
import { motion } from "framer-motion";
import { visibilityMixin, bkgMixin, sizeMixin, roundedMixin, spacingMixin, positionMixin, flag } from "~/ui/styleHelpers";

export const Box = styled.div`
  ${sizeMixin}
  ${spacingMixin}
  ${bkgMixin}
  ${roundedMixin}
  ${visibilityMixin}
  ${positionMixin}

  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ col }) => (col ? "column" : "row")};

  justify-content: ${props =>
    props.col
      ? flag(props, {
          default: "stretch; >*{ flex: auto; }",
          v_center: "center",
          v_between: "space-between",
          v_around: "space-around",
          v_top: "start",
          v_bottom: "end",
        })
      : flag(props, {
          default: "stretch; >*{ flex: auto; }",
          h_center: "center",
          h_between: "space-between",
          h_around: "space-around",
          h_left: "start",
          h_right: "end",
        })};
  align-items: ${props =>
    props.col
      ? flag(props, {
          default: "stretch",
          h_center: "center",
          h_left: "start",
          h_right: "end",
        })
      : flag(props, {
          default: "stretch",
          v_center: "center",
          v_top: "start",
          v_bottom: "end",
        })};
`;

Box.Animated = motion(Box);

Box.Square = styled(Box)`
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
