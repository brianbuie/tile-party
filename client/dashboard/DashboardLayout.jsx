import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useGames, useMe } from '~/utils/useQuery';
import { Nav, Box } from '~/ui';
import GamesList from '~/dashboard/GamesList';
import GameNav from '~/dashboard/GameNav';
import ActiveGameProvider from '~/game/ActiveGame';
import GameMenu from '~/game/GameMenu';
import CurrentMoveProvider from '~/game/CurrentMove';
import Board from '~/game/Board';
import Tray from '~/game/Tray';
import ScoreBoard from '~/game/ScoreBoard';

const Scroll = styled(Scrollbars)`
  height: calc(100vh - 5rem);
  @media ${({ theme }) => theme.screen.desktop} {
    background: var(--dashboard-left-overlay-bkg);
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
    transform: ${({ isViewingGame }) => (isViewingGame ? 'translateX(-100vw)' : 'translateX(0)')};
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
  height: 100vh;
  width: 100vw;
  @media ${({ theme }) => theme.screen.desktop} {
    width: 60vw;
  }
`;

export default function DashboardLayout() {
  const [me] = useMe();
  const [games] = useGames();

  const match = useRouteMatch('/game/:gameId');
  const { gameId } = match?.params || {};
  const game = games?.find?.(game => game.id === gameId);

  const history = useHistory();
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => history.push('/'),
  });

  return (
    <OverflowHide col>
      <DashboardContainer row isViewingGame={!!gameId}>
        <DashboardLeft col v_top>
          <Nav me={me} />
          <Scroll autoHide>{games && me && <GamesList games={games} activeGameId={gameId} me={me} />}</Scroll>
        </DashboardLeft>
        <DashboardRight col v_top {...swipeHandlers}>
          <Box row h_center height='5rem' bkg='var(--nav-bkg)'>
            <Box row v_center grow maxWidth='60vh' pad='0 1rem'>
              <GameNav game={game} me={me} />
            </Box>
          </Box>
          <Box row h_center grow>
            <Box col v_around grow maxWidth='60vh' pad='0 1rem'>
              <ActiveGameProvider game={game}>
                <ScoreBoard />
                <CurrentMoveProvider>
                  <Box col v_center>
                    <Board />
                    <Tray />
                  </Box>
                  <GameMenu />
                </CurrentMoveProvider>
              </ActiveGameProvider>
            </Box>
          </Box>
        </DashboardRight>
      </DashboardContainer>
    </OverflowHide>
  );
}
