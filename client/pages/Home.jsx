import { Box, Link } from "~/ui";
import Nav from "~/ui/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <Box col grow width="100%">
        <Link to="/game/" color="pink">
          View Games
        </Link>
      </Box>
    </>
  );
}
