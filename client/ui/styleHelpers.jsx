import { css } from 'styled-components';
import theme from '~/ui/theme';

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

// If the input is a number, assume it is supposed to be a %.
export const pctIfNum = v => (!isNaN(v) ? v + '%' : v);

export const spacingMixin = css`
  ${({ pad }) => pad && `padding: ${pad};`}
  ${({ margin }) => margin && `margin: ${margin};`}
`;

export const visibilityMixin = css`
  ${({ faded, disabled }) => (faded || disabled ? `opacity: 0.45;` : '')}
  ${({ z }) => z && `z-index: ${z};`}
  ${({ hide }) => hide && `@media ${theme.screen[hide]} { display: none; }`}
`;

export const bkgMixin = css`
  background: ${({ bkg }) => bkg || 'transparent'};
  ${({ bkgImage }) => bkgImage && `background-image: url(${bkgImage}); background-size: cover;`}
`;

export const textColorMixin = css`
  color: ${props =>
    flag(props, {
      color: props.color,
      muted: 'var(--text-muted)',
      default: 'var(--text-default)',
    })};
`;

// If input is an array, perform function on each item and join with a space
// if not a string, perform function on the single item.
const arrToString = (input, handle) => (Array.isArray(input) ? input.map(i => handle(i)).join(' ') : handle(input));

// If input is exactly true, return 2nd argument, otherwise return 3rd argument
const isBool = (input, t, f) => (input === true ? t : f);

export const roundedMixin = css`
  ${({ circle }) => circle && 'border-radius: 9999px;'}
  ${({ rounded }) => rounded && `border-radius: ${arrToString(rounded, v => isBool(v, theme.borderRadius, v || '0'))};`}
`;

// Utility for translating Array to string for inset prop
// adds % if input is a number
// uses 0 if boolean flag is used
const getInset = i => arrToString(i, v => isBool(v, '0', pctIfNum(v)));

export const absoluteStyleProps = ({ absolute }) => {
  if (!absolute) return {};
  const inset = getInset(absolute);
  return { style: { position: 'absolute', inset } };
};

export const positionMixin = css`
  ${({ position }) => position && `position: ${position};`}
  ${({ fixed }) => fixed && `position: fixed; inset: ${getInset(fixed)};`}
`;
