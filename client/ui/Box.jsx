import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  visibilityMixin,
  bkgMixin,
  roundedMixin,
  spacingMixin,
  positionMixin,
  pctIfNum,
  flag,
  absoluteStyleProps,
} from '~/ui/styleHelpers';

export const Box = styled.div.attrs(absoluteStyleProps)`
  ${spacingMixin}
  ${bkgMixin}
  ${roundedMixin}
  ${visibilityMixin}
  ${positionMixin}

  /* Size */
  ${({ height }) => height && `height: ${height};`}
  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
  ${({ width }) => width && `width: ${pctIfNum(width)};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${pctIfNum(maxWidth)};`}
  ${({ grow }) => grow && `flex-grow: ${grow === true ? 1 : grow};`}
  ${({ shrink }) => shrink && 'flex: none;'}

  /* Overflow */
  ${({ overflow }) => overflow && `overflow: ${overflow};`}

  /* Flex */
  ${props =>
    flag(props, {
      col: 'display: flex;',
      row: 'display: flex;',
      display: `display: ${props.display};`,
      default: '',
    })}
  flex-direction: ${({ col }) => (col ? 'column' : 'row')};
  justify-content: ${props =>
    props.col
      ? flag(props, {
          default: 'stretch; >*{ flex: auto; }',
          v_center: 'center',
          v_between: 'space-between',
          v_around: 'space-around',
          v_top: 'start',
          v_bottom: 'end',
        })
      : flag(props, {
          default: 'stretch; >*{ flex: auto; }',
          h_center: 'center',
          h_between: 'space-between',
          h_around: 'space-around',
          h_left: 'start',
          h_right: 'end',
        })};
  align-items: ${props =>
    props.col
      ? flag(props, {
          default: 'stretch',
          h_center: 'center',
          h_left: 'start',
          h_right: 'end',
        })
      : flag(props, {
          default: 'stretch',
          v_center: 'center',
          v_top: 'start',
          v_bottom: 'end',
        })};
`;

Box.Animated = motion(Box);

Box.Square = styled(Box)`
  position: relative;
  width: ${({ size }) => pctIfNum(size) || '100%'};
  padding-bottom: ${({ size }) => pctIfNum(size) || '100%'};
`;
