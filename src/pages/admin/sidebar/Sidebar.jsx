import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  toggleMobileSidebar,
  setIsHovered,
  toggleSubmenu,
  setIsMobile,
} from "../../../redux/features/sidebarSlice";

import logo from "../../../assets/images/logo/logo.svg";
import logoDark from "../../../assets/images/logo/logo-dark.svg";
import logo_icon from "../../../assets/images/logo/logo-icon.svg";

import Image from "../../../components/ui/Image";

import { ChevronDownIcon, HorizontalDots } from "../../../assets/svg/SvgIcons";
import { sidebarMenu } from "../../../constants/MenuItems";
import Button from "../../../components/common/Button";

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSelector(
    (state) => state.sidebar
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      dispatch(setIsMobile(mobile));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const expanded = isExpanded || isHovered;

  const isActive = (path) => location.pathname === path;

  const isSubmenuOpen = (groupIndex, itemIndex) => {
    const key = `${groupIndex}-${itemIndex}`;
    return openSubmenu === key;
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => dispatch(toggleMobileSidebar())}
        />
      )}

      <aside
        className={`
          fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-40 border-r border-gray-200
          ${expanded ? "lg:w-[290px]" : "lg:w-[90px]"}
          ${isMobileOpen ? "translate-x-0 w-[290px]" : "-translate-x-full"}
          lg:translate-x-0
        `}
        onMouseEnter={() => !isExpanded && dispatch(setIsHovered(true))}
        onMouseLeave={() => dispatch(setIsHovered(false))}
      >
        {/* Logo */}
        <div
          className={`
            py-8 flex
            ${expanded || isMobileOpen ? "justify-start" : "lg:justify-center"}
          `}
        >
          <Link to="/">
            {expanded || isMobileOpen ? (
              <>
                <Image
                  src={logo}
                  alt="Logo"
                  className="block dark:hidden"
                  width="150"
                  height="40"
                />
                <Image
                  src={logoDark}
                  alt="Logo"
                  className="hidden dark:block"
                  width="150"
                  height="40"
                />
              </>
            ) : (
              <Image src={logo_icon} alt="Logo" width="32" height="32" />
            )}
          </Link>
        </div>

        {/* Menu */}
        <div className="flex flex-col overflow-y-auto no-scrollbar duration-300 ease-linear">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              {sidebarMenu.map((menuGroup, groupIndex) => (
                <div key={groupIndex}>
                  <h2
                    className={`
                      mb-4 text-xs uppercase flex leading-[20px] text-gray-400
                      ${
                        expanded || isMobileOpen
                          ? "justify-start"
                          : "lg:justify-center"
                      }
                    `}
                  >
                    {expanded || isMobileOpen ? (
                      menuGroup.title
                    ) : (
                      <HorizontalDots />
                    )}
                  </h2>

                  {/* Items */}
                  <ul className="flex flex-col gap-4">
                    {menuGroup.items.map((item, index) => (
                      <li key={item.name}>
                        {item.subItems ? (
                          <Button
                            onClick={() =>
                              dispatch(toggleSubmenu(`${groupIndex}-${index}`))
                            }
                            className={`
                              menu-item group w-full
                              ${
                                isSubmenuOpen(groupIndex, index)
                                  ? "menu-item-active"
                                  : "menu-item-inactive"
                              }
                              ${
                                expanded || isMobileOpen
                                  ? "lg:justify-start"
                                  : "lg:justify-center"
                              }
                            `}
                          >
                            <span
                              className={
                                isSubmenuOpen(groupIndex, index)
                                  ? "menu-item-icon-active"
                                  : "menu-item-icon-inactive"
                              }
                            >
                              <item.icon />
                            </span>

                            {(expanded || isMobileOpen) && (
                              <span className="menu-item-text">
                                {item.name}
                              </span>
                            )}

                            {(expanded || isMobileOpen) && (
                              <ChevronDownIcon
                                className={`
                                  ml-auto w-5 h-5 transition-transform duration-200
                                  ${
                                    isSubmenuOpen(groupIndex, index)
                                      ? "rotate-180 text-brand-500"
                                      : ""
                                  }
                                `}
                              />
                            )}
                          </Button>
                        ) : (
                          <Link
                            to={item.path ?? "/"}
                            className={`
                              menu-item group
                              ${
                                isActive(item.path)
                                  ? "menu-item-active"
                                  : "menu-item-inactive"
                              }
                              ${
                                expanded || isMobileOpen
                                  ? "lg:justify-start"
                                  : "lg:justify-center"
                              }
                            `}
                          >
                            <span
                              className={
                                isActive(item.path)
                                  ? "menu-item-icon-active"
                                  : "menu-item-icon-inactive"
                              }
                            >
                              <item.icon />
                            </span>

                            {(expanded || isMobileOpen) && (
                              <span className="menu-item-text">
                                {item.name}
                              </span>
                            )}
                          </Link>
                        )}

                        {item.subItems && (expanded || isMobileOpen) && (
                          <div
                            className={`transition-all duration-300 ${
                              isSubmenuOpen(groupIndex, index)
                                ? "max-h-96 opacity-100"
                                : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                          >
                            <ul className="mt-2 space-y-1 ml-9">
                              {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link
                                    to={subItem.path ?? "/"}
                                    className={`
                                      menu-dropdown-item
                                      ${
                                        isActive(subItem.path)
                                          ? "menu-dropdown-item-active"
                                          : "menu-dropdown-item-inactive"
                                      }
                                    `}
                                  >
                                    {subItem.name}

                                    <span className="flex items-center gap-1 ml-auto">
                                      {subItem.new && (
                                        <span className="menu-dropdown-badge">
                                          new
                                        </span>
                                      )}
                                      {subItem.pro && (
                                        <span className="menu-dropdown-badge">
                                          pro
                                        </span>
                                      )}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
