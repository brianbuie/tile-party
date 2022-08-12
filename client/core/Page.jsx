import { ModalProvider } from "~/ui/Modal";
import RequireAuth from "~/auth/RequireAuth";
import { Col } from "~/ui";

export default function Page({ children }) {
  return (
    <ModalProvider>
      <Col v_fill h_fill minHeight="100vh">
        <RequireAuth>{children}</RequireAuth>
      </Col>
    </ModalProvider>
  );
}
