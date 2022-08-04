import Button from "@/ui/Button";
import { FacebookIcon } from "@/ui/Icons";
import { useFetch, routes } from "@/utils/useFetch";

const RequireAuth = ({ children }) => {
  const [user, loading] = useFetch("me");
  if (loading) return null;
  return user ? (
    children
  ) : (
    <>
      <Button color="facebookBlue" size="1rem" as="a" href={routes.facebookLogin}>
        <FacebookIcon />
        <span>Continue with Facebook</span>
      </Button>
      <Button margin="0.5em 0" color="pink" size="1rem" as="a" href={routes.mockLogin}>
        <span>Fake Login</span>
      </Button>
    </>
  );
};

export default RequireAuth;
