"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme as ColorTheme } from "@/config/theme";

type DarkMode = "light" | "dark";

interface ThemeContextType {
  darkMode: DarkMode;
  colorTheme: ColorTheme;
  variant: string;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (theme: DarkMode) => void;
  setColorTheme: (theme: ColorTheme) => void;
  setVariant: (variant: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkModeState] = useState<DarkMode>("light");
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(ColorTheme.Default);
  const [variant, setVariantState] = useState("box");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedDarkMode = localStorage.getItem("darkMode") as DarkMode;
    const savedColorTheme = localStorage.getItem("colorTheme") as ColorTheme;
    const savedVariant = localStorage.getItem("variant") || "box";
    
    if (savedDarkMode === "dark" || savedDarkMode === "light") {
      setDarkModeState(savedDarkMode);
      applyDarkMode(savedDarkMode);
    }
    if (savedColorTheme && Object.values(ColorTheme).includes(savedColorTheme)) {
      setColorThemeState(savedColorTheme);
    }
    setVariantState(savedVariant);
  }, []);

  const applyDarkMode = (newDarkMode: DarkMode) => {
    if (newDarkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setDarkMode = (newDarkMode: DarkMode) => {
    setDarkModeState(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    applyDarkMode(newDarkMode);
  };

  const setColorTheme = (newColorTheme: ColorTheme) => {
    setColorThemeState(newColorTheme);
    localStorage.setItem("colorTheme", newColorTheme);
  };

  const setVariant = (newVariant: string) => {
    setVariantState(newVariant);
    localStorage.setItem("variant", newVariant);
  };

  const toggleDarkMode = () => {
    const newDarkMode = darkMode === "light" ? "dark" : "light";
    setDarkMode(newDarkMode);
  };

  const value: ThemeContextType = {
    darkMode,
    colorTheme,
    variant,
    isDarkMode: darkMode === "dark",
    toggleDarkMode,
    setDarkMode,
    setColorTheme,
    setVariant,
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}