import Box from "@/ui/Box";
import Nav from "./Nav";

export default function Page({ children }) {
  return (
    <Box col height="fill-available">
      <Nav />
      <Box col grow width="100%" pad="0 10px">
        {children}
      </Box>
    </Box>
  );
}
