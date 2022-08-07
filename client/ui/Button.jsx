import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Button = styled.button`
  border: none;
  border-radius: 9999px;
  line-height: 1.2;
  white-space: nowrap;
  text-decoration: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  color: ${({ txtColor }) => txtColor || "white"};
  background-color: ${({ color, theme }) => {
    if (!color) return "transparent";
    return theme.colors[color] || color;
  }};
  box-shadow: ${({ shadow, theme }) => (shadow ? "inset 0 -0.2em 0 " + theme.colors.shadow : "none")};
  font-weight: 600;
  font-size: ${({ size }) => size || "1em"};
  padding: ${({ pad }) => pad || "0.75em 1.5em"};
  ${({ margin }) => margin && `margin: ${margin};`}
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  max-width: ${({ maxWidth }) => maxWidth || "none"};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  &:focus {
    outline: none;
    box-shadow: none;
  }
  .icon {
    font-size: 1.5em;
  }
  .space-left {
    margin-left: 0.75em;
  }
  .space-top {
    margin-top: 0.75em;
  }
`;

export const Link = styled(Button).attrs({
  as: RouterLink,
})``;
