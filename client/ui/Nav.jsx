import { Box, Button, Logo, Face } from "~/ui";
import { routes, useFetch } from "~/utils/useFetch";

const Me = () => {
  const [user] = useFetch("me");
  return (
    user && (
      <Button pad="0" as="a" href={routes.logout}>
        <Face user={user} size="3rem" />
      </Button>
    )
  );
};

export default function Nav({ children }) {
  return (
    <Box row as="nav" pad="1rem" width="100%" bkg="darkOverlay">
      <Box row width="33%" justify="start">
        {children}
      </Box>
      <Box row width="33%">
        <Box width="6rem" height="3rem">
          <Logo />
        </Box>
      </Box>
      <Box row width="33%" justify="end">
        <Me />
      </Box>
    </Box>
  );
}
