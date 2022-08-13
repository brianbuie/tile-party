import { useParams, useHistory } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useFetch } from "~/utils/useFetch";
import { useMe } from "~/auth/RequireAuth";
import { Nav, Box } from "~/ui";
import GamesList from "~/game/GamesList";
import ScoreBoard from "~/game/ScoreBoard";
import GameNav from "~/game/GameNav";
import Board from "~/board/Board";

const Scroll = styled(Scrollbars)`
  height: calc(100vh - 5rem);
  @media ${({ theme }) => theme.screen.desktop} {
    background: rgba(20, 10, 14, 0.1);
  }
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

const DashboardRight = styled(Box)`
  width: 100vw;
  @media ${({ theme }) => theme.screen.desktop} {
    width: 60vw;
  }
`;

export default function DashboardLayout() {
  const [games, gamesLoading] = useFetch("viewGames");
  const { gameId } = useParams();
  const game = games && games.find(game => game.id === gameId);

  const me = useMe();

  const history = useHistory();
  const swipeHandlers = useSwipeable({ onSwipedRight: () => history.push("/game") });

  return (
    <OverflowHide col>
      <DashboardContainer row isViewingGame={!!gameId}>
        <DashboardLeft col v_top>
          <Nav me={me} />
          <Scroll autoHide>{!gamesLoading && games && me && <GamesList games={games} activeGameId={gameId} me={me} />}</Scroll>
        </DashboardLeft>
        <DashboardRight col v_top {...swipeHandlers}>
          <Box row h_center height="5rem" bkg="overlayDark">
            <Box row v_center grow maxWidth="35rem" pad="0 1rem">
              <GameNav game={game} me={me} />
            </Box>
          </Box>
          <Box row h_center grow>
            {game && (
              <Box col grow maxWidth="35rem" pad="0 1rem">
                <ScoreBoard game={game} me={me} />
                <Board game={game} />
              </Box>
            )}
          </Box>
        </DashboardRight>
      </DashboardContainer>
    </OverflowHide>
  );
}
