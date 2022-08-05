import { Link } from "react-router-dom";
import { useFetch } from "~/utils/useFetch";
import RequireAuth from "~/auth/RequireAuth";
import { BackArrowIcon } from "~/ui/Icons";
import Box from "~/ui/Box";
import Button from "~/ui/Button";
import Nav from "~/ui/Nav";
import Board from "~/game/Board";

export default function Game() {
  const [game, loading, error] = useFetch("viewGame", { id: "mock" });
  // const [words] = useFetch("/dictionary.txt", { cachePolicy: "cache-first" });
  // const dictionary = words?.split("\n");
  console.log(game);
  return (
    <>
      <Nav>
        <Button as={Link} to="/" pad="0">
          <BackArrowIcon />
          <span className="space-left">Games</span>
        </Button>
      </Nav>
      <Box col grow width="100%" pad="0 1rem">
        <RequireAuth>{!loading && game && <Board {...game} />}</RequireAuth>
      </Box>
    </>
  );
}