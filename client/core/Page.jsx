import { ModalProvider } from "~/ui/Modal";
import RequireAuth from "~/auth/RequireAuth";
import { Box } from "~/ui/Box";

export default function Page({ children }) {
  return (
    <ModalProvider>
      <Box col minHeight="100vh">
        <RequireAuth>{children}</RequireAuth>
      </Box>
    </ModalProvider>
  );
}
