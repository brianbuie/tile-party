import styled from "styled-components";
import Theme from "@/ui/Theme";

const Headline = styled.h1`
  margin: 0;
  padding: 1em;
  text-align: center;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = () => (
  <Theme>
    <Container>
      <Headline>Tile Party</Headline>
    </Container>
  </Theme>
);

export default App;
