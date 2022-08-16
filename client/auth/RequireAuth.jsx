import React, { useContext } from 'react';
import { Button, Box, Icon, Text } from '~/ui';
import { useFetch, routes } from '~/utils/useFetch';

const MeContext = React.createContext();

export default function RequireAuth({ children }) {
  const [me, loading] = useFetch('me');
  if (loading) return null;
  return (
    <MeContext.Provider value={me}>
      {me ? (
        children
      ) : (
        <Box col v_center h_center>
          <Icon.Logo width='6rem' />
          <Text.H1 margin='1rem 0 4rem 0'>Tile Party</Text.H1>
          <Button bkg='#3378f2' href={routes.facebookLogin}>
            <Icon.Facebook />
            <span>Continue with Facebook</span>
          </Button>
          <Button.Primary margin='1rem' href={routes.mockLogin}>
            Fake Login
          </Button.Primary>
        </Box>
      )}
    </MeContext.Provider>
  );
}

export const useMe = () => {
  const me = useContext(MeContext);
  return me;
};
