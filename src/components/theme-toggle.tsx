"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-all duration-300 group overflow-hidden border border-border/50 hover:border-border"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

      <div className="relative z-10 flex items-center justify-center">
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
        ) : (
          <Sun className="w-5 h-5 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
        )}
      </div>

      <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}
