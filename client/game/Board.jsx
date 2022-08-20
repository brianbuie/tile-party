import styled from 'styled-components';
import { Box } from '~/ui';
import BoardSpot from '~/game/BoardSpot';
import Tile from '~/game/Tile';
import { useActiveGame } from '~/game/ActiveGame';
import { getAbsolute, getAllAdjacentItems } from '~/game/utils/locHelpers';

const AbsoluteBox = styled(Box).attrs(props => {
  const [top, right, bottom, left] = getAbsolute(props.loc, props.size).map(l => l + '%');
  return {
    style: {
      position: 'absolute',
      top,
      right,
      bottom,
      left,
    },
  };
})``;

export const BoardSpots = () => {
  const { spots, boardSpotSize } = useActiveGame();

  return spots.map(({ spotType, loc: [x, y] }) => (
    <AbsoluteBox key={`${x}_${y}`} loc={[x, y]} size={boardSpotSize}>
      <BoardSpot spotType={spotType} />
    </AbsoluteBox>
  ));
};

export const StaticTiles = () => {
  const { staticTiles, boardSpotSize, getLetterValue } = useActiveGame();

  return staticTiles.map(({ letter, isLastMove, loc: [x, y] }) => (
    <AbsoluteBox key={`${x}_${y}`} loc={[x, y]} size={boardSpotSize}>
      <Tile
        surroundingTiles={getAllAdjacentItems(staticTiles, [x, y])}
        letter={letter}
        value={getLetterValue(letter)}
        isLastMove={isLastMove}
      />
    </AbsoluteBox>
  ));
};
