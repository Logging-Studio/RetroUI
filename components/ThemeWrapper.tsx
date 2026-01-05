"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { colorTheme, variant } = useTheme();

  useEffect(() => {
    const wrapper = document.querySelector(".theme-wrapper");
    if (wrapper) {
      wrapper.className = `theme-wrapper theme-${colorTheme} ${variant}`;
    }
  }, [colorTheme, variant]);

  return <div className={`theme-wrapper theme-${colorTheme} ${variant}`}>{children}</div>;
}