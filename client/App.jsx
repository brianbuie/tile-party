import { BrowserRouter, Switch, Route } from "react-router-dom";
import { IconProvider } from "~/ui/Icons";
import { FetchProvider } from "~/utils/useFetch";
import GlobalStyle from "~/core/GlobalStyle";
import Page from "~/core/Page";
import Home from "~/core/Home";
import DashboardLayout from "~/core/DashboardLayout";

const App = () => (
  <GlobalStyle>
    <IconProvider>
      <FetchProvider>
        <BrowserRouter>
          <Page>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/game/:gameId?" component={DashboardLayout} />
            </Switch>
          </Page>
        </BrowserRouter>
      </FetchProvider>
    </IconProvider>
  </GlobalStyle>
);

export default App;
