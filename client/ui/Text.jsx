import styled from "styled-components";
import { flag, spacingMixin, textColorMixin } from "~/ui/styleHelpers";

export const Text = styled.span`
  font-size: ${props =>
    flag(props, {
      sm: "0.8rem",
      default: "1rem",
      lg: "1.25rem",
      xl: "1.5rem",
      xxl: "2.5rem",
    })};
  font-weight: ${props =>
    flag(props, {
      thin: 300,
      default: 500,
      bold: 700,
      heavy: 900,
    })};
  ${textColorMixin}
  font-style: ${({ italic }) => (italic ? "italic" : "normal")};
  line-height: 1.33;

  /* Spacing */
  padding: 0;
  margin: 0;
  ${spacingMixin}
`;

Text.Em = styled(Text).attrs({
  as: "em",
  thin: true,
  italic: true,
  sm: true,
})``;

Text.Strong = styled(Text).attrs({
  as: "strong",
  bold: true,
})``;

Text.H3 = styled(Text).attrs({
  as: "h3",
  bold: true,
  lg: true,
})``;

Text.H2 = styled(Text).attrs({
  as: "h2",
  heavy: true,
  xl: true,
})``;

Text.H1 = styled(Text).attrs({
  as: "h1",
  heavy: true,
  xxl: true,
})``;

Text.Score = styled(Text).attrs({
  heavy: true,
})``;
