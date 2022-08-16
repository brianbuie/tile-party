import { ModalProvider } from '~/ui/Modal';
import RequireAuth from '~/auth/RequireAuth';
import { Box } from '~/ui';

export default function Page({ children }) {
  return (
    <ModalProvider>
      <Box col v_fill h_fill minHeight='100vh'>
        <RequireAuth>{children}</RequireAuth>
      </Box>
    </ModalProvider>
  );
}
