import { useEffect, useState, ReactNode } from "react";
import { ThemeContext, Theme } from "../context/ThemeContext";

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = "app-theme";

export function ThemeProvider({ children }: Props) {
  // --- initial theme ---
  const getInitialTheme = (): Theme => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    // system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // --- toggle ---
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // --- sync theme ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}