import RequireAuth from "~/auth/RequireAuth";
import Box from "~/ui/Box";
import Nav from "~/ui/Nav";
import GamesList from "~/game/GamesList";

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
