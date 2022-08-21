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

const pct = v => (!isNaN(v) ? v + '%' : v);

export const sizeMixin = css`
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ width }) => width && `width: ${pct(width)};`}
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

// Utility for translating Array to string for inset prop
// adds % if input is a number
// uses 0 if boolean flag is used.
const getInset = input => {
  let inset = input === true ? '0' : input;
  if (Array.isArray(input)) inset = input.map(v => (!isNaN(v) ? v + '%' : v)).join(' ');
  return inset;
};

export const absoluteStyleProps = ({ absolute }) => {
  if (!absolute) return {};
  const inset = getInset(absolute);
  return { style: { position: 'absolute', inset } };
};

export const positionMixin = css`
  ${({ position }) => position && `position: ${position};`}
  ${({ fixed }) => fixed && `position: fixed; inset: ${getInset(fixed)};`}
`;
