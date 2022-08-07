import { Outlet } from "react-router-dom";
import RequireAuth from "~/auth/RequireAuth";
import { Box } from "~/ui/Box";

export default function Page() {
  return (
    <Box col minHeight="100vh">
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    </Box>
  );
}
