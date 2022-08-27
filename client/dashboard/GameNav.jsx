import { AnimatePresence } from 'framer-motion';
import { Box, Button, Icon, Face, Text } from '~/ui';
import { getGameName, getLastMove, getLastMovePlayer, getLastMoveDescription } from '@common/playerHelpers';

const gameNameAnimation = {
  initial: {
    x: 50,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      delay: 0.1,
      duration: 0.1,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
    },
  },
};

const lastMoveAnimation = {
  initial: {
    y: -20,
    rotateX: 60,
    transformPerspective: 200,
    opacity: 0,
  },
  animate: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: {
      delay: 0.25,
      ease: 'backOut',
      duration: 0.15,
    },
  },
  exit: {
    y: 20,
    rotateX: -60,
    transformPerspective: 200,
    opacity: 0,
    transition: {
      ease: 'backOut',
      duration: 0.15,
    },
  },
};

const NavTitle = ({ game, me }) => (
  <AnimatePresence exitBeforeEnter>
    <Box.Animated key={`name-${game.id}`} {...gameNameAnimation}>
      <Text.Strong>{getGameName(game, me.id)}</Text.Strong>
    </Box.Animated>
    {getLastMove(game) && (
      <Box.Animated row pad='0.25rem 0 0' key={`lastMove-${game.id}`} {...lastMoveAnimation}>
        <Box pad='0 0.5rem 0 0'>
          <Face size='1.5rem' user={getLastMovePlayer(game)} />
        </Box>
        <Text.Em muted>{getLastMoveDescription(game)}</Text.Em>
      </Box.Animated>
    )}
  </AnimatePresence>
);

export default function GameNav({ game, me }) {
  if (!game || !me) return null;
  return (
    <>
      <Box row shrink hide='desktop'>
        <Button to='/' size='1.5rem' pad='0.5rem 0.5rem 0.5rem 0'>
          <Icon.BackArrow />
        </Button>
      </Box>
      <Box col h_left grow>
        <NavTitle game={game} me={me} />
      </Box>
      <Box row shrink hide='mobile'>
        <Button to='/' size='1.5rem' pad='0.5rem 0 0.5rem 1rem'>
          <Icon.Close />
        </Button>
      </Box>
    </>
  );
}
