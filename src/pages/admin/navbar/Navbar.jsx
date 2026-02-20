import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSidebar,
  toggleMobileSidebar,
} from "../../../redux/features/sidebarSlice";
import {
  CrossIcon,
  HorizontalDots,
  SidebarToggleIcon,
} from "../../../assets/svg/SvgIcons";
import HeaderLogo from "../../../assets/svg/SvgIcons";
import Button from "../../../components/common/Button";
import ThemeToggler from "../../../components/ui/ThemeToggler";
import UserMenu from "../../../components/ui/UserMenu";
import SearchBar from "../../../components/common/SearchBar";
export default function Navbar() {
  const dispatch = useDispatch();
  const isMobileOpen = useSelector((state) => state.sidebar.isMobileOpen);
  const [isApplicationMenuOpen, setIsApplicationMenuOpen] = useState(false);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      dispatch(toggleSidebar());
    } else {
      dispatch(toggleMobileSidebar());
    }
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-40 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <Button
            onClick={handleToggle}
            className={`flex items-center justify-center w-10 h-11 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 dark:text-gray-400 lg:h-11 lg:w-11 lg:border ${
              isMobileOpen
                ? "lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-gray-800"
                : ""
            }`}
          >
            {isMobileOpen ? <CrossIcon /> : <SidebarToggleIcon />}
          </Button>
          <div className="lg:hidden">
            <HeaderLogo />
          </div>
          <Button
            onClick={() => setIsApplicationMenuOpen(!isApplicationMenuOpen)}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <HorizontalDots />
          </Button>
          <SearchBar />
        </div>

        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 shadow-theme-md lg:flex lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            <ThemeToggler />
            {/* <NotificationMenu /> */}
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
