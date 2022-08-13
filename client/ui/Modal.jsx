import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Box, Button, Icon } from "~/ui";

const ModalContext = React.createContext();

const Blur = styled(Box.Animated).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.2,
    ease: "easeInOut",
  },
})`
  backdrop-filter: blur(20px);
`;

const Gradient = styled(Box.Animated).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 0.5 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.2,
    ease: "easeInOut",
  },
})`
  background: linear-gradient(rgba(0, 0, 0, 1) 50%, rgba(114, 51, 88, 0.8));
`;

const ModalContent = styled(Box.Animated).attrs({
  initial: { y: "25vh", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: "25vh", opacity: 0 },
  transition: {
    duration: 0.2,
    type: "spring",
    damping: 25,
    stiffness: 500,
  },
})`
  width: 20rem;
  max-width: 90vw;
  background: linear-gradient(rgba(97, 55, 145, 1), rgba(80, 80, 147, 1));
  border-radius: 1rem;
  overflow: hidden;
`;

const ModalContainer = () => {
  const { isOpen, Content } = React.useContext(ModalContext);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <Blur col v_center h_center fixedFill z="100">
          <Gradient fixedFill z="101" />
          <ModalContent col z="102">
            {Content}
          </ModalContent>
        </Blur>
      )}
    </AnimatePresence>,
    document.querySelector("#modal-root")
  );
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Content, setContent] = useState(null);

  const openModal = newContent => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, Content, setContent }}>
      <ModalContainer />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const { openModal, closeModal } = React.useContext(ModalContext);
  return { openModal, closeModal };
};

export const ModalHeader = ({ children, closeModal }) => (
  <Box row pad="0 1.5rem" height="5rem" bkg="overlayDark">
    <Box col h_left v_center grow>
      {children}
    </Box>
    <Box shrink>
      <Button onClick={closeModal} pad="0">
        <Icon.Close />
      </Button>
    </Box>
  </Box>
);
