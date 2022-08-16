import styled from "styled-components";
import { Box, theme } from "~/ui";

const TileBorder = styled(Box.Square)`
  background-color: var(--tile-outline);
`;

const TileText = styled.text`
  font-weight: 700;
  font-family: ${({ theme }) => theme.tileFontFamily};
  fill: ${({ isLastMove }) => (isLastMove ? "var(--text)" : "var(--tile-text)")};
`;

const Value = styled(TileText)`
  font-size: 25px;
  letter-spacing: -0.15em;
`;

const Letter = styled(TileText)`
  font-style: italic;
  font-size: 80px;
`;

export default function Tile({ surroundingTiles, letter, value, isLastMove, ...props }) {
  const [t, r, b, l] = surroundingTiles || [];
  const rounded = [!t && !l, !t && !r, !r && !b, !b && !l];
  const borders = [!t, !r, !b, !l].map(condition => (condition ? theme.responsiveBorder : "0"));
  const pad = [t, r, b, l].map(condition => (condition ? theme.responsiveBorder : "0")).join(" ");
  return (
    <TileBorder rounded={rounded} isLastMove={isLastMove} {...props}>
      <Box absolute={borders} bkg="var(--spot-outline)" rounded={rounded} pad={pad}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <Value isLastMove={isLastMove} x="15" y="30">
            {value ?? 1}
          </Value>
          <Letter isLastMove={isLastMove} x="25" y="80">
            {letter}
          </Letter>
        </svg>
      </Box>
    </TileBorder>
  );
}
