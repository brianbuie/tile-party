import { Button, Box, Icon, Text } from '~/ui';
import { useMe, routes } from '~/utils/useQuery';

export default function RequireAuth({ children }) {
  const [me, loading] = useMe();
  if (loading) return null;
  return me ? (
    children
  ) : (
    <Box col v_center h_center height='100vh'>
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
  );
}
