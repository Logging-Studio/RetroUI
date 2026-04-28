"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Library = "radix" | "baseui";

interface LibraryContextType {
  library: Library;
  setLibrary: (library: Library) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const STORAGE_KEY = "retroui-library-preference";

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [library, setLibraryState] = useState<Library>("radix");
  const [isInitialized, setIsInitialized] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "radix" || stored === "baseui") {
        setLibraryState(stored);
      }
    } catch (error) {
      // localStorage might be disabled (private browsing, etc.)
      console.warn("Failed to read library preference from localStorage:", error);
    }
    setIsInitialized(true);
  }, []);

  // Persist to localStorage on change
  const setLibrary = (newLibrary: Library) => {
    setLibraryState(newLibrary);
    try {
      localStorage.setItem(STORAGE_KEY, newLibrary);
    } catch (error) {
      console.warn("Failed to persist library preference to localStorage:", error);
    }
  };

  // Prevent hydration mismatch by not rendering until initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <LibraryContext.Provider value={{ library, setLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
