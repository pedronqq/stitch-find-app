import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "costura-facil-theme";
const DESKTOP_QUERY = "(min-width: 768px)";
const DARK_QUERY = "(prefers-color-scheme: dark)";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({ theme: "light", toggleTheme: () => {} });

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const dark = window.matchMedia(DARK_QUERY);

    const resolve = () => {
      // No desktop vale a escolha manual; no celular segue o sistema.
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const next: Theme =
        desktop.matches && (stored === "light" || stored === "dark")
          ? stored
          : dark.matches
            ? "dark"
            : "light";
      setTheme(next);
      applyTheme(next);
    };

    resolve();
    desktop.addEventListener("change", resolve);
    dark.addEventListener("change", resolve);
    window.addEventListener("storage", resolve);
    return () => {
      desktop.removeEventListener("change", resolve);
      dark.removeEventListener("change", resolve);
      window.removeEventListener("storage", resolve);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
