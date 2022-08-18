import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IconProvider } from '~/ui/Icons';
import { FetchProvider } from '~/utils/useFetch';
import { ModalProvider } from '~/ui/Modal';
import GlobalStyle from '~/ui/GlobalStyle';
import RequireAuth from '~/auth/RequireAuth';
import DashboardLayout from '~/dashboard/DashboardLayout';

const App = () => (
  <GlobalStyle>
    <IconProvider>
      <FetchProvider>
        <BrowserRouter>
          <ModalProvider>
            <RequireAuth>
              <Route path='/' component={DashboardLayout} />
            </RequireAuth>
          </ModalProvider>
        </BrowserRouter>
      </FetchProvider>
    </IconProvider>
  </GlobalStyle>
);

export default App;
