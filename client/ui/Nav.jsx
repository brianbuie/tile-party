import { Box, Button, Text, Icon, Face, useModal, ModalHeader } from "~/ui";
import { routes } from "~/utils/useFetch";

const MeModal = () => {
  const { closeModal } = useModal();
  return (
    <Box col>
      <ModalHeader closeModal={closeModal}>
        <Text.H2>Your Profile</Text.H2>
      </ModalHeader>
      <Box col v_top pad="1.5rem">
        This is My Modal
      </Box>
      <Box row h_center pad="0 1.5rem 1.5rem 1.5rem">
        <Button.Primary href={routes.logout} margin="0 1rem 0 0">
          Log Out
        </Button.Primary>
      </Box>
    </Box>
  );
};

export default function Nav({ children, me }) {
  const { openModal } = useModal();
  return (
    <Box row as="nav" pad="1rem" bkg="var(--nav-bkg)">
      <Box col h_left width="33%">
        {me && (
          <Button pad="0" onClick={() => openModal(<MeModal />)}>
            <Face user={me} size="3rem" />
          </Button>
        )}
      </Box>
      <Box col h_center width="33%">
        <Box col h_center width="6rem" height="3rem">
          <Icon.Logo width="2rem" />
        </Box>
      </Box>
      <Box col h_right width="33%">
        {children}
      </Box>
    </Box>
  );
}
