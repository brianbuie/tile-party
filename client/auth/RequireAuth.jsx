import React, { useContext } from "react";
import { Button, Col, Icon, Logo } from "~/ui";
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
        <Col v_center h_center>
          <Col width="250px" margin="0 0 50px 0">
            <Logo />
          </Col>
          <Button margin="1em 0" color="facebookBlue" size="1rem" as="a" href={routes.facebookLogin}>
            <Icon.Facebook />
            <span className="space-left">Continue with Facebook</span>
          </Button>
          <Button color="pink" as="a" href={routes.mockLogin}>
            <span>Fake Login</span>
          </Button>
        </Col>
      )}
    </MeContext.Provider>
  );
}

export const useMe = () => {
  const res = useContext(MeContext);
  return res?.me;
};
