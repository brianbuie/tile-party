import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Box, Button, AnimatedBox, Icon } from "~/ui";

const ModalContext = React.createContext();

const Blur = styled(AnimatedBox).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.2,
    ease: "easeInOut",
  },
})`
  backdrop-filter: blur(20px);
  justify-content: center;
  align-items: center;
`;

const Gradient = styled(AnimatedBox).attrs({
  initial: { opacity: 0 },
  animate: { opacity: 0.5 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.2,
    ease: "easeInOut",
  },
})`
  background: linear-gradient(rgba(0, 0, 0, 1) 50%, rgba(11, 61, 66, 1));
`;

const ModalContent = styled(AnimatedBox).attrs({
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
  align-items: stretch;
  border-radius: 1rem;
  overflow: hidden;
`;

const ModalContainer = () => {
  const { isOpen, Content } = React.useContext(ModalContext);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <Blur col fixedFill z="100">
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
  <Box row pad="0 1.5rem" height="5rem" bkg="darkOverlay">
    <Box col grow align="flex-start">
      {children}
    </Box>
    <Button onClick={closeModal} pad="0">
      <Icon.Close />
    </Button>
  </Box>
);
