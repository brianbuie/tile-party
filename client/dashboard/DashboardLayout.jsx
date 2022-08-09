import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useFetch } from "~/utils/useFetch";
import { Box, AnimatedBox, Button, Icon, Face, Square, Nav, Headline, Text } from "~/ui";
import Board from "~/board/Board";
import GamesList from "./GamesList";

export const GameView = () => {
  const [game, loading, error] = useFetch("viewGame", { id: "mock" });
  return (
    !loading &&
    game && (
      <Box col grow maxWidth="35rem">
        <Board {...game} />
      </Box>
    )
  );
};

const Scroll = styled(Scrollbars)`
  height: calc(100vh - 5rem);
`;

const OverflowHide = styled(Box)`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const DashboardContainer = styled(Box)`
  width: 100vw;
  @media ${({ theme }) => theme.screen.mobile} {
    width: 200vw;
    transform: ${({ isViewingGame }) => (isViewingGame ? "translateX(-100vw)" : "translateX(0)")};
    transition: transform 0.2s ease-in-out;
  }
`;

const DashboardLeft = styled(Box)`
  width: 100vw;
  @media ${({ theme }) => theme.screen.desktop} {
    width: 40vw;
    max-width: 25rem;
  }
`;

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

export default function DashboardLayout() {
  const [games, gamesLoading] = useFetch("viewGames");
  const { gameId } = useParams();
  const activeGame = games && games.find(game => game.id === gameId);

  const navigate = useNavigate();
  const swipeHandlers = useSwipeable({ onSwipedRight: e => navigate("/game") });

  console.log(games);

  return (
    <OverflowHide col align="start">
      <DashboardContainer row grow align="stretch" isViewingGame={!!gameId}>
        <DashboardLeft col>
          <Nav />
          <Scroll autoHide>{!gamesLoading && games && <GamesList games={games} activeGameId={gameId} />}</Scroll>
        </DashboardLeft>
        <Box col grow align="stretch" {...swipeHandlers}>
          <Box row height="5rem" bkg="darkOverlay" pad="0 1rem">
            {activeGame && (
              <Box row grow width="67%" maxWidth="35rem">
                <Box row hide="desktop">
                  <Button to="/game" size="1.5rem" pad="0.5rem 0.5rem 0.5rem 0">
                    <Icon.BackArrow />
                  </Button>
                </Box>
                <Box col grow align="start">
                  <Headline md>{activeGame.opponents.map(o => o.name).join(", ")}</Headline>
                  <AnimatedBox row pad="0.25rem 0 0" key={activeGame.id} {...lastMoveAnimation}>
                    <Box pad="0 0.5rem 0 0">
                      <Face size="1.5rem" user={activeGame.lastMove.user} />
                    </Box>
                    <Text xs thin italic color="textMuted">
                      {activeGame.lastMove.description}
                    </Text>
                  </AnimatedBox>
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
            <Outlet />
          </Box>
        </Box>
      </DashboardContainer>
    </OverflowHide>
  );
}
