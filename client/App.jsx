import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IconProvider } from "~/ui/Icons";
import { FetchProvider } from "~/utils/useFetch";
import GlobalStyle from "~/core/GlobalStyle";
import Page from "~/core/Page";
import Home from "~/pages/Home";
import Game from "~/pages/Game";

const App = () => (
  <GlobalStyle>
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
  </GlobalStyle>
);

export default App;
