import { useFetch } from "~/utils/useFetch";
import { Box, Link, AnimatedBox, Button } from "~/ui";

export default function GamesList() {
  const [games, loading] = useFetch("viewGames");

  return (
    !loading && (
      <Box col grow width="100%" justify="start" align="start">
        <h2>Games</h2>
        {games.map(game => (
          <Box row key={game.id}>
            {game.id}
          </Box>
        ))}
        <Link to="/game/mock" color="pink">
          Mock Game
        </Link>
        <AnimatedBox fixed={["auto", "1rem", "2rem", "auto"]} initial={{ y: "400%" }} animate={{ y: 0 }}>
          <Button color="green" onClick={() => console.log("create game")}>
            New Game
          </Button>
        </AnimatedBox>
      </Box>
    )
  );
}
