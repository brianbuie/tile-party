import { Box } from '~/ui';
import { DeployedTiles, Tray } from '~/game/MovableTiles';
import BoardSpot from '~/game/BoardSpot';
import Tile from '~/game/Tile';
import { useActiveGame } from '~/game/ActiveGame';
import { getAllAdjacentItems, getAbsoluteLoc } from '~/game/utils/locHelpers';

export const BoardSpots = () => {
  const { spots, boardSpotSize } = useActiveGame();
  return spots.map(({ spotType, loc: [x, y] }) => (
    <Box key={`${x}_${y}`} absolute={getAbsoluteLoc([x, y], boardSpotSize)}>
      <BoardSpot spotType={spotType} />
    </Box>
  ));
};

export const StaticTiles = () => {
  const { staticTiles, boardSpotSize, getLetterValue } = useActiveGame();
  return staticTiles.map(({ letter, isLastMove, loc: [x, y] }) => (
    <Box key={`${x}_${y}`} absolute={getAbsoluteLoc([x, y], boardSpotSize)}>
      <Tile
        surroundingTiles={getAllAdjacentItems(staticTiles, [x, y])}
        letter={letter}
        value={getLetterValue(letter)}
        isLastMove={isLastMove}
      />
    </Box>
  ));
};

export default function Board() {
  return (
    <Box col>
      <Box col bkg='var(--spot-outline)' pad='0.25rem' rounded='1.5%'>
        <Box.Square>
          <BoardSpots />
          <StaticTiles />
          <DeployedTiles />
        </Box.Square>
      </Box>
      <Tray />
    </Box>
  );
}
