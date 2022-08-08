import { Outlet } from "react-router-dom";
import { ModalProvider } from "~/ui/Modal";
import RequireAuth from "~/auth/RequireAuth";
import { Box } from "~/ui/Box";

export default function Page() {
  return (
    <ModalProvider>
      <Box col minHeight="100vh">
        <RequireAuth>
          <Outlet />
        </RequireAuth>
      </Box>
    </ModalProvider>
  );
}
