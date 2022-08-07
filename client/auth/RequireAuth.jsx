import { Button, Box, Icon, Logo } from "~/ui";
import { useFetch, routes } from "~/utils/useFetch";

const RequireAuth = ({ children }) => {
  const [user, loading] = useFetch("me");
  if (loading) return null;
  return user ? (
    children
  ) : (
    <>
      <Box width="250px" margin="0 0 50px 0">
        <Logo />
      </Box>
      <Button margin="1em 0" color="facebookBlue" size="1rem" as="a" href={routes.facebookLogin}>
        <Icon.Facebook />
        <span className="space-left">Continue with Facebook</span>
      </Button>
      <Button color="pink" as="a" href={routes.mockLogin}>
        <span>Fake Login</span>
      </Button>
    </>
  );
};

export default RequireAuth;
