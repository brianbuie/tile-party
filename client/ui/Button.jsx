import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const BaseButton = styled.button`
  /* Text */
  font-size: ${({ size }) => size || "1rem"};
  font-weight: 600;
  color: ${({ $txtColor, theme }) => theme.colors[$txtColor] || $txtColor || "white"};
  text-transform: uppercase;
  white-space: nowrap;
  text-decoration: none;
  line-height: 1.33;
  letter-spacing: 0.025rem;
  white-space: nowrap;

  /* Shape */
  border: ${({ border }) => (border === true ? "0.125rem solid white" : border || "none")};
  border-radius: 9999px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background-color: ${({ color, theme }) => {
    if (!color) return "transparent";
    return theme.colors[color] || color;
  }};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};

  /* Spacing */
  padding: ${({ pad }) => pad || "0.75em 1.5em"};
  ${({ margin }) => margin && `margin: ${margin};`}

  /* Layout */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  ${({ width }) => width && `width: ${width};`}
  max-width: ${({ maxWidth }) => maxWidth || "none"};
  ${({ grow }) => grow && "flex-grow: 1;"}

  &:focus {
    outline: none;
    box-shadow: none;
  }
  .icon {
    font-size: 1.5em;
    color: ${({ $txtColor, theme }) => theme.colors[$txtColor] || $txtColor || "white"};
  }
  .space-left {
    margin-left: 0.75em;
  }
  .space-top {
    margin-top: 0.75em;
  }
`;

// RouterLink if "to" prop is present
export const Button = styled(BaseButton).attrs(props => {
  if (props.to) return { as: RouterLink };
  if (props.href) return { as: "a" };
})``;
