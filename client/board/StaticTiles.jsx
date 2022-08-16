import { Box } from '~/ui';
import { useActiveGame } from '~/game/ActiveGame';
import useBoardLayout from '~/board/config/useBoardLayout';
import useMoveHistory from '~/board/useMoveHistory';
import useGameMode from '~/board/config/useGameMode';
import Tile from '~/board/Tile';

export default function StaticTiles() {
  const game = useActiveGame();
  if (!game) return null;
  const { cols, rows, spotSize } = useBoardLayout(game.settings.boardLayout);
  const { getLetterValue } = useGameMode(game.settings.gameMode);
  const { getStaticTile, getSurroundingTiles } = useMoveHistory(game.moveHistory);

  return rows.map((_, y) => (
    <Box row key={y}>
      {cols.map((_, x) => {
        const staticTile = getStaticTile([x, y]);
        return staticTile ? (
          <Tile
            surroundingTiles={getSurroundingTiles([x, y])}
            letter={staticTile.letter}
            value={getLetterValue(staticTile.letter)}
            isLastMove={staticTile.isLastMove}
            size={spotSize + '%'}
            key={x}
          />
        ) : (
          <Box.Square size={spotSize + '%'} key={x} />
        );
      })}
    </Box>
  ));
}
