import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IconProvider } from "~/ui/Icons";
import { FetchProvider } from "~/utils/useFetch";
import GlobalStyle from "~/core/GlobalStyle";
import Page from "~/core/Page";
import Home from "~/pages/Home";
import DashboardLayout, { GameView } from "~/dashboard/DashboardLayout";

const App = () => (
  <GlobalStyle>
    <IconProvider>
      <FetchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page />}>
              <Route index element={<Home />} />
              <Route path="game" element={<DashboardLayout />}>
                <Route path=":id" element={<GameView />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </FetchProvider>
    </IconProvider>
  </GlobalStyle>
);

export default App;
