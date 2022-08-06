import { Link, Box } from "~/ui";
import { BackArrowIcon } from "~/ui/Icons";
import { useFetch } from "~/utils/useFetch";
import RequireAuth from "~/auth/RequireAuth";
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
        <Link to="/" pad="0">
          <BackArrowIcon />
          <span className="space-left">Games</span>
        </Link>
      </Nav>
      <Box col grow width="100%" pad="0 1rem">
        <RequireAuth>{!loading && game && <Board {...game} />}</RequireAuth>
      </Box>
    </>
  );
}
