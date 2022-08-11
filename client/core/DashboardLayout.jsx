import { useParams, useHistory } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useFetch } from "~/utils/useFetch";
import { useMe } from "~/auth/RequireAuth";
import { Box, Nav } from "~/ui";
import GamesList from "~/game/GamesList";
import GamePage from "~/game/GamePage";

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

export default function DashboardLayout() {
  const [games, gamesLoading] = useFetch("viewGames");
  const { gameId } = useParams();
  const activeGame = games && games.find(game => game.id === gameId);

  const me = useMe();

  const history = useHistory();
  const swipeHandlers = useSwipeable({ onSwipedRight: () => history.push("/game") });

  return (
    <OverflowHide col align="start">
      <DashboardContainer row grow stretch isViewingGame={!!gameId}>
        <DashboardLeft col stretch>
          <Nav />
          <Scroll autoHide>{!gamesLoading && games && <GamesList games={games} activeGameId={gameId} me={me} />}</Scroll>
        </DashboardLeft>
        <Box col grow stretch {...swipeHandlers}>
          <GamePage game={activeGame} me={me} />
        </Box>
      </DashboardContainer>
    </OverflowHide>
  );
}
