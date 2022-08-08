import styled from "styled-components";

const TextBase = styled.span`
  font-size: ${({ xs, sm, lg, xl, size }) => {
    if (xs) return "0.75rem";
    if (sm) return "0.875rem";
    if (lg) return "1.125rem";
    if (xl) return "1.5rem";
    return size || "1rem";
  }};
  font-weight: ${({ weight, bold, thin }) => {
    if (bold) return "700";
    if (thin) return "300";
    return weight || "500";
  }};
  color: ${({ color, theme }) => theme.colors[color] || theme.colors.text};
  font-style: ${({ italic }) => (italic ? "italic" : "normal")};
  line-height: 1.33;

  /* Spacing */
  margin: 0;
  padding: 0;
`;

export const Text = styled(TextBase).attrs(props => {
  if (props.muted) return { color: "textMuted" };
})``;

export const Headline = styled(Text).attrs(props => {
  if (props.md) return { as: "h4" };
  if (props.xl) return { as: "h2" };
  return { as: "h3" };
})``;

export const Score = styled(Headline)`
  font-family: "Rubik", ui-rounded, sans-serif;
`;
