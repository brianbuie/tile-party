import styled, { createGlobalStyle } from "styled-components";

export {
  IoChevronBack as BackArrow,
  IoChevronForward as ForwardArrow,
  IoClose as Close,
  IoLogoFacebook as Facebook,
  IoAdd as Add,
  IoMenu as Burger,
  IoShuffle as Shuffle,
  IoSwapHorizontal as Swap,
} from "react-icons/io5";

export { GrRedo as Pass } from "react-icons/gr";
export { MdCallReceived as Recall } from "react-icons/md";

import { IconContext } from "react-icons";

const IconColorStyle = createGlobalStyle`
  .icon { color: ${({ theme }) => theme.colors.text}; }
`;

export const IconProvider = ({ children }) => (
  <IconContext.Provider value={{ className: "icon" }}>
    <IconColorStyle />
    {children}
  </IconContext.Provider>
);

const CustomIcon = styled.div`
  svg {
    ${({ height }) => height && `height: ${height};`}
    ${({ width }) => width && `width: ${widtht};`}
  }
  path {
    fill: ${({ color, theme }) => theme.colors[color] || color || theme.colors.text};
  }
`;

export const Crown = props => (
  <CustomIcon {...props}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.2 6.7">
      <path
        d="M8.7,6.7H0.5C0.2,6.7,0,6.5,0,6.2V1.6c0-0.2,0.1-0.4,0.3-0.5c0.2-0.1,0.4-0.1,0.5,0.1l1.6,1.4l1.7-2.4
	c0.2-0.3,0.6-0.3,0.8,0l1.7,2.4l1.6-1.4c0.1-0.1,0.4-0.2,0.5-0.1c0.2,0.1,0.3,0.3,0.3,0.5v4.6C9.2,6.5,9,6.7,8.7,6.7z M1,5.7h7.2v-3
	L7,3.7C6.9,3.8,6.7,3.9,6.6,3.8c-0.1,0-0.3-0.1-0.3-0.2L4.6,1.3L3,3.6C2.9,3.8,2.7,3.8,2.6,3.8c-0.1,0-0.3,0-0.4-0.1L1,2.7V5.7z"
      />
    </svg>
  </CustomIcon>
);

export const Logo = styled.img.attrs({
  src: "/icon.svg",
})`
  width: ${({ width }) => width || "1rem"};
`;
