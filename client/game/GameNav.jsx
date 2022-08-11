import { AnimatePresence } from "framer-motion";
import { Box, AnimatedBox, Button, Icon, Face, Headline, Text } from "~/ui";
import { getGameName, getLastMove, getLastMovePlayer, getLastMoveDescription } from "~/game/gameHelpers";

const gameNameAnimation = {
  initial: {
    x: 50,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      delay: 0.1,
      duration: 0.1,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: {
      ease: "easeInOut",
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
      ease: "backOut",
      duration: 0.15,
    },
  },
  exit: {
    y: 20,
    rotateX: -60,
    transformPerspective: 200,
    opacity: 0,
    transition: {
      ease: "backOut",
      duration: 0.15,
    },
  },
};

const NavTitle = ({ game, me }) => (
  <AnimatePresence exitBeforeEnter>
    <AnimatedBox key={`name-${game.id}`} {...gameNameAnimation}>
      <Headline md>{getGameName(game, me.id)}</Headline>
    </AnimatedBox>
    {getLastMove(game) && (
      <AnimatedBox row pad="0.25rem 0 0" key={`lastMove-${game.id}`} {...lastMoveAnimation}>
        <Box pad="0 0.5rem 0 0">
          <Face size="1.5rem" user={getLastMovePlayer(game)} />
        </Box>
        <Text xs thin italic color="textMuted">
          {getLastMoveDescription(game)}
        </Text>
      </AnimatedBox>
    )}
  </AnimatePresence>
);

export default function GameNav({ game, me }) {
  return (
    <>
      <Box row height="5rem" bkg="darkOverlay" pad="0 1rem">
        {game && (
          <Box row grow width="67%" maxWidth="35rem">
            <Box row hide="desktop">
              <Button to="/game" size="1.5rem" pad="0.5rem 0.5rem 0.5rem 0">
                <Icon.BackArrow />
              </Button>
            </Box>
            <Box col grow align="start">
              <NavTitle game={game} me={me} />
            </Box>
            <Box row hide="mobile">
              <Button to="/game" size="1.5rem" pad="0.5rem 0 0.5rem 1rem">
                <Icon.Close />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
