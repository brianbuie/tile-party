import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { flag, bkgMixin, textColorMixin, visibilityMixin } from "~/ui/styleHelpers";

const ButtonBase = styled.button`
  /* Base Size */
  font-size: ${({ size }) => size || "1rem"};
  .icon {
    font-size: 1.5em;
  }

  /* Text Styles */
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  line-height: 1.33;
  letter-spacing: 0.025em;
  white-space: nowrap;

  /* Layout */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};
  > span {
    ${({ vertical }) => (vertical ? "margin-top: 0.3em;" : "margin-left: 0.75em;")}
  }

  /* Size */
  ${({ width }) => width && `width: ${width};`}
  max-width: ${({ maxWidth }) => maxWidth || "none"};
  ${({ grow }) => grow && "flex-grow: 1;"}

  /* Spacing */
  padding: ${({ pad }) => pad || "0.75em 1.5em"};
  ${({ margin }) => margin && `margin: ${margin};`}

  /* Shape & Border */
  border: none;
  border-radius: 9999px;
  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* Colors */
  ${bkgMixin}
  ${textColorMixin}
  .icon {
    ${textColorMixin}
  }

  /* Disabled */
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  ${visibilityMixin}
`;

export const Button = styled(ButtonBase).attrs(props => ({
  as: flag(props, {
    to: RouterLink,
    href: "a",
    default: props.as,
  }),
}))``;

Button.Primary = styled(Button).attrs(props => ({
  bkg: !props.disabled ? "primary" : "primaryDisabled",
}))``;

Button.Secondary = styled(Button)`
  border: 0.125em solid white;
`;
