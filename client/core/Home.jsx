import { Box, Button } from '~/ui';
import Nav from '~/ui/Nav';

export default function Home() {
  return (
    <Box col v_top>
      <Nav />
      <Box col h_center v_center grow>
        <Button.Primary to="/game/">View Games</Button.Primary>
      </Box>
    </Box>
  );
}
