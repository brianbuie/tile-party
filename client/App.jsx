import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IconProvider } from "~/ui/Icons";
import { FetchProvider } from "~/utils/useFetch";
import ThemeProvider from "~/ui/ThemeProvider";
import Page from "~/ui/Page";
import Home from "~/pages/Home";
import Game from "~/pages/Game";

const App = () => (
  <ThemeProvider>
    <IconProvider>
      <FetchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page />}>
              <Route index element={<Home />} />
              <Route path="/game/:gameId" element={<Game />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FetchProvider>
    </IconProvider>
  </ThemeProvider>
);

export default App;
