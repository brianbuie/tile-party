import { Box, Button } from "~/ui";
import Nav from "~/ui/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <Box col grow width="100%">
        <Button to="/game/" color="pink">
          View Games
        </Button>
      </Box>
    </>
  );
}
