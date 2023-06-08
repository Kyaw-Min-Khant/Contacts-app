import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();
export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => window.localStorage.getItem("darkMode") || "light"
  );
  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleThemeSwitch = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
  };

  const data = { darkMode, setDarkMode, handleThemeSwitch };

  return (
    <DarkModeContext.Provider value={data}>{children}</DarkModeContext.Provider>
  );
};

export const UseCustomProvider = () => useContext(DarkModeContext);
