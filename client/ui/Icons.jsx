export {
  IoChevronBack as BackArrowIcon,
  IoLogoFacebook as FacebookIcon,
  IoAdd as AddIcon,
  IoMenu as BurgerIcon,
  IoShuffle as ShuffleIcon,
  IoSwapHorizontal as SwapIcon,
} from "react-icons/io5";

export { GrRedo as PassIcon } from "react-icons/gr";
export { MdCallReceived as RecallIcon } from "react-icons/md";

import { IconContext } from "react-icons";

export const IconProvider = ({ children }) => (
  <IconContext.Provider value={{ className: "icon" }}>{children}</IconContext.Provider>
);
