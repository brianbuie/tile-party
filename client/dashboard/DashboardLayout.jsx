import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useFetch } from "~/utils/useFetch";
import { Box, Button, Icon, Face, Square, Nav, Headline, Text } from "~/ui";
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

export default function DashboardLayout() {
  return (
    <Box row grow width="100%" align="stretch">
      <Box col width="33%" maxWidth="25rem">
        <Nav />
        <Scroll autoHide>
          <GamesList />
        </Scroll>
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
              <Button to="/game" size="1.5rem" pad="0.5rem">
                <Icon.Close />
              </Button>
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
