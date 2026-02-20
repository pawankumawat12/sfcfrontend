import { useEffect, useState } from "react";
import Button from "../common/Button";
import { MoonIcon, SunIcon } from "../../assets/svg/SvgIcons";

export default function ThemeToggler() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("tailadmin-theme");
    if (saved) return saved === "dark";
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("tailadmin-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Button
      onClick={() => setDark((d) => !d)}
      className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      aria-label="Toggle theme"
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
