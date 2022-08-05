import { Link } from "react-router-dom";
import { useFetch } from "~/utils/useFetch";
import Box, { AnimatedBox } from "~/ui/Box";
import Button from "~/ui/Button";

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
        <Button as={Link} to="/game/mock" color="pink">
          Mock Game
        </Button>
        <AnimatedBox fixed={["auto", "1rem", "2rem", "auto"]} initial={{ y: "400%" }} animate={{ y: 0 }}>
          <Button color="green" onClick={() => console.log("create game")}>
            New Game
          </Button>
        </AnimatedBox>
      </Box>
    )
  );
}
