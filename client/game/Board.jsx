import { Box } from '~/ui';
import { DeployedTiles, Tray } from '~/game/MovableTiles';
import Spots from '~/game/Spots';
import Tile from '~/game/Tile';
import { useActiveGame } from '~/game/ActiveGame';
import { getStaticTiles, getLastMove } from '@common/playerHelpers';
import { getAllAdjacentItems, getAbsoluteLoc, getItemByLoc } from '@common/locHelpers';
import gameConfig from '@common/gameConfig';
import ZoomWindow from '~/game/ZoomPan';

const StaticTiles = () => {
  const game = useActiveGame();
  const { boardSpotSize, getLetterValue } = gameConfig();
  const staticTiles = getStaticTiles(game);
  const lastMove = getLastMove(game);

  return staticTiles.map(({ letter, loc: [x, y] }) => (
    <Box key={`${x}_${y}`} absolute={getAbsoluteLoc([x, y], boardSpotSize)}>
      <Tile
        surroundingTiles={getAllAdjacentItems(staticTiles, [x, y])}
        letter={letter}
        value={getLetterValue(letter)}
        isLastMove={!!getItemByLoc(lastMove?.tiles || [], [x, y])}
      />
    </Box>
  ));
};

export default function Board() {
  return (
    <Box col>
      <ZoomWindow>
        <Box col bkg='var(--spot-outline)' pad='0.25rem' rounded='1.5%'>
          <Box.Square>
            <Spots />
            <StaticTiles />
            <DeployedTiles />
          </Box.Square>
        </Box>
      </ZoomWindow>
      <Tray />
    </Box>
  );
}
