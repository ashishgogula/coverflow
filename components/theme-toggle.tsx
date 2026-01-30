"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="h-11 w-11 rounded-full bg-foreground/5 opacity-50 cursor-wait"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 mx-auto" />
      </button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-11 w-11 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 0 : 1,
          opacity: theme === "dark" ? 0 : 1,
          rotate: theme === "dark" ? 90 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-yellow-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-purple-400" />
      </motion.div>
    </motion.button>
  );
}
