import { createGlobalStyle } from "styled-components";

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
  .icon { color: white; }
`;

export const IconProvider = ({ children }) => (
  <IconContext.Provider value={{ className: "icon" }}>
    <IconColorStyle />
    {children}
  </IconContext.Provider>
);
