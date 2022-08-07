import styled from "styled-components";
import { Box } from "~/ui";

const TileShape = styled(Box)`
  box-shadow: ${({ shadow, highlight, theme }) =>
    [shadow && "inset 0 -2px 0 " + theme.tile.bottomEdge, highlight && "inset 0 2px 0 " + theme.tile.topEdge].filter(r => !!r).join(", ") || "none"};
  background-color: ${({ theme, movable }) => (movable ? "rgba(44, 255, 255, 0.8)" : theme.tile.bkg)};
  border-color: rgba(186, 56, 183, 0.7);
  border-style: solid;
  border-width: ${({ movable }) => (movable ? "1px" : 0)};
  svg {
    width: 100%;
  }
`;

const TileText = styled.text`
  font-weight: 700;
  font-family: ${({ theme }) => theme.tile.font};
  fill: ${({ active, theme }) => (active ? theme.tile.textActive : theme.tile.textNormal)};
  filter: drop-shadow(2px 2px 0 ${({ active, theme }) => (active ? theme.tile.textNormal : theme.tile.topEdge)});
`;

const Value = styled(TileText)`
  font-size: 25px;
  letter-spacing: -0.15em;
`;

const Letter = styled(TileText)`
  font-style: italic;
  font-size: 80px;
`;

export default function Tile({ surroundingTiles, letter, value, isLastMove, movable, ...props }) {
  const [t, r, b, l] = surroundingTiles || [];
  const rounded = [!t && !l, !t && !r, !r && !b, !b && !l];
  return (
    <TileShape rounded={rounded} shadow={!b} highlight={!t} movable={movable} {...props}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <Value active={isLastMove} x="15" y="30">
          {value ?? 1}
        </Value>
        <Letter active={isLastMove} x="25" y="80">
          {letter}
        </Letter>
      </svg>
    </TileShape>
  );
}
