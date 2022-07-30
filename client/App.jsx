import { IconProvider } from "@/ui/Icons";
import { FetchProvider } from "@/utils/useFetch";
import ThemeProvider from "@/brand/Theme";
import Page from "@/layout/Page";
import Game from "@/game/Game";

const App = () => (
  <ThemeProvider>
    <IconProvider>
      <FetchProvider>
        <Page>
          <Game />
        </Page>
      </FetchProvider>
    </IconProvider>
  </ThemeProvider>
);

export default App;
