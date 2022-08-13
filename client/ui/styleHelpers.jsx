import { css } from "styled-components";

/*
  Utility for translating flags to various styles
    const Element = styled.div`
      font-size: ${props => flag(props, {
        sm: '0.5rem',
        default: '1rem',
        lg: '1.5rem'
      })};
    `;
    ...
    <Element lg />
*/
export const flag = (props, vals) => vals[Object.keys(vals).find(k => !!props[k]) || "default"];

export const sizeMixin = css`
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ width }) => width && `width: ${width};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ grow }) => grow && `flex-grow: ${grow === true ? 1 : grow};`}
  ${({ shrink }) => shrink && "flex: none;"}
`;

export const spacingMixin = css`
  ${({ pad }) => pad && `padding: ${pad};`}
  ${({ margin }) => margin && `margin: ${margin};`}
`;

export const visibilityMixin = css`
  ${({ faded, disabled }) => (faded || disabled ? `opacity: 0.35;` : "")}
  ${({ z }) => z && `z-index: ${z};`}
  ${({ hide, theme }) => hide && `@media ${theme.screen[hide]} { display: none; }`}
`;

export const bkgMixin = css`
  background-color: ${({ bkg, theme }) => (bkg ? theme.colors[bkg] || bkg : "transparent")};
  ${({ bkgImage }) => bkgImage && `background-image: url(${bkgImage}); background-size: cover;`}
`;

export const textColorMixin = css`
  color: ${({ theme, ...props }) =>
    flag(props, {
      color: theme.colors[props.color] || props.color,
      muted: theme.colors.textMuted,
      default: theme.colors.text,
    })};
`;

export const roundedMixin = css`
  border-radius: ${({ rounded, theme }) => {
    if (!rounded) return "0";
    if (rounded === "full") return "9999px";
    if (Array.isArray(rounded)) return rounded.map(a => (a ? theme.borderRadius : "0")).join(" ");
    if (rounded === true) return theme.borderRadius;
    return rounded;
  }};
`;

export const positionMixin = css`
  ${({ position }) => position && `position: ${position};`}
  ${({ absolute }) => absolute && `position: absolute; top: ${absolute[0]}; right: ${absolute[1]}; bottom: ${absolute[2]}; left: ${absolute[3]};`}
  ${({ absoluteFill }) => absoluteFill && `position: absolute; top: 0; right: 0; bottom: 0; left: 0;`}
  ${({ fixed }) => fixed && `position: fixed; top: ${fixed[0]}; right: ${fixed[1]}; bottom: ${fixed[2]}; left: ${fixed[3]};`}
  ${({ fixedFill }) => fixedFill && `position: fixed; top: 0; right: 0; bottom: 0; left: 0;`}
`;
