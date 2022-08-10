import { Box, AnimatedBox, Button, Icon, Face, Headline, Text } from "~/ui";
import { getGameName, getLastMove, getLastMovePlayer, getLastMoveDescription } from "~/game/gameUtils";
import Board from "~/board/Board";

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
  },
  transition: {
    ease: "backOut",
    duration: 0.15,
    delay: 0.3,
  },
};

const GameNav = ({ game, me }) => (
  <>
    <Headline md>{getGameName(game, me.id)}</Headline>
    {getLastMove(game) && (
      <AnimatedBox row pad="0.25rem 0 0" key={game.id} {...lastMoveAnimation}>
        <Box pad="0 0.5rem 0 0">
          <Face size="1.5rem" user={getLastMovePlayer(game)} />
        </Box>
        <Text xs thin italic color="textMuted">
          {getLastMoveDescription(game)}
        </Text>
      </AnimatedBox>
    )}
  </>
);

export default function GamePage({ game, me }) {
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
              <GameNav game={game} me={me} />
            </Box>
            <Box row hide="mobile">
              <Button to="/game" size="1.5rem" pad="0.5rem 0 0.5rem 1rem">
                <Icon.Close />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box grow pad="0 1rem">
        <Box col grow maxWidth="35rem">
          {game && <Board game={game} />}
        </Box>
      </Box>
    </>
  );
}
