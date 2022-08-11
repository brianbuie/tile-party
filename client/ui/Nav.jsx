import { Box, Button, Headline, Logo, Face, useModal, ModalHeader } from "~/ui";
import { useMe } from "~/auth/RequireAuth";

const MeModal = () => {
  const { closeModal } = useModal();
  return (
    <Box col stretch>
      <ModalHeader closeModal={closeModal}>
        <Headline xl>Your Profile</Headline>
      </ModalHeader>
      <Box col pad="1.5rem" align="flex-start">
        This is My Modal
      </Box>
      <Box row pad="0 1.5rem 1.5rem 1.5rem" justify="space-between">
        <Button border width="50%" margin="0 1rem 0 0" onClick={closeModal}>
          Cancel
        </Button>
        <Button color="pink" width="50%" onClick={closeModal}>
          OK
        </Button>
      </Box>
    </Box>
  );
};

const Me = () => {
  const me = useMe();
  const { openModal } = useModal();
  return (
    me && (
      <Button pad="0" as="a" onClick={() => openModal(<MeModal />)}>
        <Face user={me} size="3rem" />
      </Button>
    )
  );
};

export default function Nav({ children }) {
  return (
    <Box row as="nav" pad="1rem" bkg="darkOverlay">
      <Box row width="33%" justify="start">
        <Me />
      </Box>
      <Box row width="33%">
        <Box width="6rem" height="3rem">
          <Logo />
        </Box>
      </Box>
      <Box row width="33%" justify="end">
        {children}
      </Box>
    </Box>
  );
}
