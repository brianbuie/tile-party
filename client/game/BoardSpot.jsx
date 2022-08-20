import styled from 'styled-components';
import { Box, theme } from '~/ui';

const spotColors = {
  BLANK: 'var(--spot-outline)',
  CENTER: 'var(--spot-outline)',
  DL: 'var(--spot-outline-dl)',
  DW: 'var(--spot-outline-dw)',
  TL: 'var(--spot-outline-tl)',
  TW: 'var(--spot-outline-tw)',
};

const spotLabels = {
  BLANK: ' ',
  CENTER: 'C',
  DL: 'DL',
  DW: 'DW',
  TL: 'TL',
  TW: 'TW',
};

const SpotInner = styled(Box)`
  box-shadow: inset 0 2px 0 rgba(35, 27, 60, 0.4);
  svg {
    width: 100%;
  }
`;

const SpotLabel = styled.text`
  font-family: ${({ theme }) => theme.tileFontFamily};
  font-weight: 700;
  fill: ${({ color }) => color};
  font-size: 45px;
  text-anchor: middle;
`;

export default function BoardSpot({ spotType }) {
  return (
    <Box.Square bkg={spotColors[spotType]} rounded>
      <SpotInner absolute={theme.responsiveBorder} bkg='var(--spot-bkg)' rounded>
        <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
          <SpotLabel x='50%' y='50%' dominantBaseline='central' color={spotColors[spotType]}>
            {spotLabels[spotType]}
          </SpotLabel>
        </svg>
      </SpotInner>
    </Box.Square>
  );
}
