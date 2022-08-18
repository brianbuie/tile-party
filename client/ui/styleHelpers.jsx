import { css } from 'styled-components';

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
export const flag = (props, vals) => vals[Object.keys(vals).find(k => !!props[k]) || 'default'];

export const sizeMixin = css`
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ width }) => width && `width: ${width};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
  ${({ grow }) => grow && `flex-grow: ${grow === true ? 1 : grow};`}
  ${({ shrink }) => shrink && 'flex: none;'}
`;

export const spacingMixin = css`
  ${({ pad }) => pad && `padding: ${pad};`}
  ${({ margin }) => margin && `margin: ${margin};`}
`;

export const visibilityMixin = css`
  ${({ faded, disabled }) => (faded || disabled ? `opacity: 0.45;` : '')}
  ${({ z }) => z && `z-index: ${z};`}
  ${({ hide, theme }) => hide && `@media ${theme.screen[hide]} { display: none; }`}
`;

export const bkgMixin = css`
  background: ${({ bkg }) => bkg || 'transparent'};
  ${({ bkgImage }) => bkgImage && `background-image: url(${bkgImage}); background-size: cover;`}
`;

export const textColorMixin = css`
  color: ${({ theme, ...props }) =>
    flag(props, {
      color: props.color,
      muted: 'var(--text-muted)',
      default: 'var(--text-default)',
    })};
`;

export const roundedMixin = css`
  ${({ circle }) => circle && 'border-radius: 9999px;'}
  ${({ rounded, theme }) => {
    if (!rounded) return;
    if (Array.isArray(rounded))
      return `border-radius: ${rounded.map(a => (a === true ? theme.borderRadius : a || '0')).join(' ')};`;
    return `border-radius: ${rounded === true ? theme.borderRadius : rounded};`;
  }}
`;

// Utility for providing top, right, bottom, left positions as a string, like margin or padding
// absolute="0 auto" -> top: 0; right: auto; bottom: 0; left: auto;
const easyEdges = input => {
  const props = ['top', 'right', 'bottom', 'left'];
  const stringify = arr => props.map((p, k) => `${p}: ${arr[k] ?? 'auto'};`).join(' ');
  let a = input;
  if (typeof input == 'string') a = input.split(' ');
  if (a.length === 1) return stringify(Array(4).fill(a[0]));
  if (a.length === 2) return stringify([a[0], a[1], a[0], a[1]]);
  if (a.length === 3) return stringify([a[0], a[1], a[2], a[1]]);
  return stringify(a);
};

export const positionMixin = css`
  ${({ position }) => position && `position: ${position};`}
  ${({ absolute }) => absolute && `position: absolute; ${easyEdges(absolute)}`}
  ${({ fixed }) => fixed && `position: fixed; ${easyEdges(fixed)}`}
`;
