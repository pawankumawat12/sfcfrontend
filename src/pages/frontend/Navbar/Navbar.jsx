import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "../../../components/ui/UserDropdown";
import logoDark from "../../../assets/images/logo/logo.svg";
import Image from "../../../components/ui/Image";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef(null);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Games", id: "games" },
    { label: "Menu", id: "menu" },
    { label: "Our Cafes", id: "cafes" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 100;

      navLinks.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();

    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-9xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="text-xl font-bold text-[#4b2e2b]">
            <Image src={logoDark} alt="Logo dark" />
          </div>

          <div className="flex gap-5">
            {/* Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className="relative text-sm font-medium pb-1 hover:text-yellow-500"
                >
                  {item.label}

                  {/* 🔥 ACTIVE UNDERLINE */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-yellow-500
        transition-all duration-300 ease-in-out
        ${activeSection === item.id ? "w-full" : "w-0"}`}
                  />
                </button>
              ))}
            </nav>

            {/* <UserDropdown /> */}
            <div className="flex gap-5">
              <button
                className="text-2xl md:hidden"
                onClick={() => {
                  console.log("toggle");
                  setMenuOpen((prev) => !prev);
                }}
              >
                {menuOpen ? "✕" : "☰"}
              </button>
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className="md:hidden">
        {/* Hamburger */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="bg-white px-6 pb-6 pt-2 space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item?.id}
                to="#"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium"
              >
                {item?.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
