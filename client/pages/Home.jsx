import { Box } from "~/ui";
import Nav from "~/ui/Nav";
import GamesList from "~/board/GamesList";

export default function Home() {
  return (
    <>
      <Nav />
      <Box col grow width="100%" pad="0 0.5rem">
        <GamesList />
      </Box>
    </>
  );
}
