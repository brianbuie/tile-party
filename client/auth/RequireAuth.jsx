import React, { useContext } from "react";
import { Button, Box, Icon, Logo } from "~/ui";
import { useFetch, routes } from "~/utils/useFetch";

const MeContext = React.createContext();

export default function RequireAuth({ children }) {
  const [me, loading] = useFetch("me");
  if (loading) return null;
  return (
    <MeContext.Provider value={{ me }}>
      {me ? (
        children
      ) : (
        <Box col v_center h_center>
          <Box col width="250px" margin="0 0 50px 0">
            <Logo />
          </Box>
          <Button margin="1em 0" bkg="#3378f2" href={routes.facebookLogin}>
            <Icon.Facebook />
            <span>Continue with Facebook</span>
          </Button>
          <Button.Primary href={routes.mockLogin}>Fake Login</Button.Primary>
        </Box>
      )}
    </MeContext.Provider>
  );
}

export const useMe = () => {
  const res = useContext(MeContext);
  return res?.me;
};
