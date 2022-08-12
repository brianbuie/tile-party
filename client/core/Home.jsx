import { Col, Button } from "~/ui";
import Nav from "~/ui/Nav";

export default function Home() {
  return (
    <Col v_top>
      <Nav />
      <Col h_center v_center grow>
        <Button to="/game/" color="pink">
          View Games
        </Button>
      </Col>
    </Col>
  );
}
