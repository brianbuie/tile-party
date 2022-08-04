import { Outlet } from "react-router-dom";
import Box from "@/ui/Box";
import Nav from "./Nav";

export default function Page() {
  return (
    <Box col minHeight="100vh">
      <Nav />
      <Box col grow width="100%" pad="0 0.5rem">
        <Outlet />
      </Box>
    </Box>
  );
}
