import styled from "styled-components";
import { visibilityMixin, bkgMixin, sizeMixin, spacingMixin } from "~/ui/styledMixins";

const FlexBase = styled.div`
  display: flex;
  ${({ grow }) => grow && `flex-grow: ${grow === true ? 1 : grow};`}
  ${sizeMixin}
	${spacingMixin}
	${bkgMixin}
	${visibilityMixin}
`;

const flagMap = (props, map) => map[Object.keys(map).find(k => !!props[k])] || map["default"];

export const Col = styled(FlexBase)`
  flex-direction: column;
  justify-content: ${props =>
    flagMap(props, {
      default: "stretch; >*{ flex: auto; }",
      v_center: "center",
      v_between: "space-between",
      v_around: "space-around",
      v_top: "start",
      v_bottom: "end",
    })};
  align-items: ${props =>
    flagMap(props, {
      default: "stretch",
      h_center: "center",
      h_left: "start",
      h_right: "end",
    })};
`;

export const Row = styled(FlexBase)`
  flex-direction: row;
  justify-content: ${props =>
    flagMap(props, {
      default: "stretch; >*{ flex: auto; }",
      h_center: "center",
      h_between: "space-between",
      h_around: "space-around",
      h_left: "start",
      h_right: "end",
    })};
  align-items: ${props =>
    flagMap(props, {
      default: "stretch",
      v_center: "center",
      v_top: "start",
      v_bottom: "end",
    })};
`;
