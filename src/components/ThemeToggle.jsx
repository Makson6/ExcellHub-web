import React from "react";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isnight, setIsnight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsnight(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsnight(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsnight(false);
      // console.log("Thème clair activé");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsnight(true);
      // console.log("Thème sombre activé");
    }
  };

  return (
    <div className="flex items-center justify-start">
      <button
        onClick={toggleTheme}
        className="flex h-8 w-8 justify-center items-center rounded-full 
                   hover:cursor-pointer hover:animate-bounce
                   hover:text-midnight dark:hover:text-accent 
                   text-background dark:text-white/80"
      >
        {isnight ? (
          <Moon className="h-6 w-6 active:animate-ping" />
        ) : (
          <Sun className="h-6 w-6 active:animate-spin" />
        )}
      </button>
    </div>
  );
}
