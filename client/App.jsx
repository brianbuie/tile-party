import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { IconProvider } from '~/ui/Icons';
import { QueryProvider } from '~/utils/useQuery';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ModalProvider } from '~/ui/Modal';
import GlobalStyle from '~/ui/GlobalStyle';
import RequireAuth from '~/auth/RequireAuth';
import DashboardLayout from '~/dashboard/DashboardLayout';

const App = () => (
  <GlobalStyle>
    <IconProvider>
      <QueryProvider>
        <BrowserRouter>
          <ModalProvider>
            <RequireAuth>
              <Route path='/' component={DashboardLayout} />
            </RequireAuth>
          </ModalProvider>
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
      </QueryProvider>
    </IconProvider>
  </GlobalStyle>
);

export default App;
