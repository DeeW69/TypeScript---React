import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "clair" | "sombre";

interface ThemeContexte {
  theme: Theme;
  basculer: () => void;
}

const Contexte = createContext<ThemeContexte | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeDeDepart = localStorage.getItem("theme") === "sombre" ? "sombre" : "clair";
  const [theme, setTheme] = useState<Theme>(themeDeDepart);

  useEffect(() => {
    if (theme === "sombre") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  function basculer() {
    if (theme === "clair") {
      setTheme("sombre");
    } else {
      setTheme("clair");
    }
  }

  return (
    <Contexte.Provider value={{ theme, basculer }}>{children}</Contexte.Provider>
  );
}

export function useTheme() {
  const contexte = useContext(Contexte);
  if (!contexte) {
    throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  }
  return contexte;
}
