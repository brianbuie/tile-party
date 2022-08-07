import { Outlet } from "react-router-dom";
import { useFetch } from "~/utils/useFetch";
import { Box, Link, Face, Square, Nav, Headline, Text } from "~/ui";
import { CloseIcon } from "~/ui/Icons";
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

export default function DashboardLayout() {
  return (
    <Box row grow width="100%" align="stretch">
      <Box col width="33%" maxWidth="25rem">
        <Nav />
        <Box col grow justify="start" align="start" width="100%" pad="2.5rem 1rem 0 1rem">
          <GamesList />
        </Box>
      </Box>
      <Box col grow align="stretch">
        <Box row height="5rem" bkg="darkOverlay" pad="0 1rem">
          <Box row grow width="67%" maxWidth="35rem">
            <Box col grow align="start" pad="0 0 0 1rem">
              <Headline md>Opponent Name</Headline>
              <Box row pad="0.25rem 0 0">
                <Box pad="0 0.5rem 0 0">
                  <Face size="1.5rem" user={{ image: "https://cataas.com/cat?width=50&height=50" }} />
                </Box>
                <Text xs thin italic color="textMuted">
                  Played COOL for 14 points
                </Text>
              </Box>
            </Box>
            <Box row>
              <Link to="/game" size="1.5rem" pad="0.5rem">
                <CloseIcon />
              </Link>
            </Box>
          </Box>
        </Box>
        <Box grow>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
