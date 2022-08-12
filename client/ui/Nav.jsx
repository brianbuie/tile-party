import { Box, Col, Row, Button, Headline, Logo, Face, useModal, ModalHeader } from "~/ui";
import { useMe } from "~/auth/RequireAuth";
import { routes } from "~/utils/useFetch";

const MeModal = () => {
  const { closeModal } = useModal();
  return (
    <Col>
      <ModalHeader closeModal={closeModal}>
        <Headline xl>Your Profile</Headline>
      </ModalHeader>
      <Col v_top pad="1.5rem">
        This is My Modal
      </Col>
      <Row h_center pad="0 1.5rem 1.5rem 1.5rem">
        <Button to={routes.logout} color="pink" margin="0 1rem 0 0">
          Log Out
        </Button>
      </Row>
    </Col>
  );
};

export default function Nav({ children, me }) {
  const { openModal } = useModal();
  return (
    <Row as="nav" pad="1rem" bkg="darkOverlay">
      <Col h_left width="33%">
        {me && (
          <Button pad="0" as="a" onClick={() => openModal(<MeModal />)}>
            <Face user={me} size="3rem" />
          </Button>
        )}
      </Col>
      <Col h_center width="33%">
        <Col width="6rem" height="3rem">
          <Logo />
        </Col>
      </Col>
      <Col h_right width="33%">
        {children}
      </Col>
    </Row>
  );
}
