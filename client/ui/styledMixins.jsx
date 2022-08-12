import { css } from "styled-components";

export const sizeMixin = css`
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ width }) => width && `width: ${width};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
`;

export const spacingMixin = css`
  ${({ pad }) => pad && `padding: ${pad};`}
  ${({ margin }) => margin && `margin: ${margin};`}
`;

export const visibilityMixin = css`
  ${({ faded }) => faded && `opacity: 0.5;`}
  ${({ z }) => z && `z-index: ${z};`}
  ${({ hide, theme }) => hide && `@media ${theme.screen[hide]} { display: none; }`}
`;

export const bkgMixin = css`
  ${({ bkg, theme }) => bkg && `background: ${theme.colors[bkg] || bkg};`}
  ${({ bkgImage }) => bkgImage && `background-image: url(${bkgImage}); background-size: cover;`}
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
