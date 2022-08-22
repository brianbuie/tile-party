import { useState } from 'react';
import styled from 'styled-components';
import { useActiveGame } from '~/game/ActiveGame';
import { Box } from '~/ui';

const Transformer = styled(Box)`
  transform: scale(${({ scale }) => scale});
  transition: transform 0.1s ease-out;
`;

export default function ZoomWindow({ children }) {
  const [scale, setScale] = useState(1);

  const onClick = e => {
    if (e.detail < 2) return;
    setScale(scale => (scale !== 1 ? 1 : 1.75));
  };

  return (
    <Box overflow='hidden' onClick={onClick}>
      <Transformer scale={scale}>{children}</Transformer>
    </Box>
  );
}
