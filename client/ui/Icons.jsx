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

export const IconProvider = ({ children }) => <IconContext.Provider value={{ className: "icon", color: "white" }}>{children}</IconContext.Provider>;
