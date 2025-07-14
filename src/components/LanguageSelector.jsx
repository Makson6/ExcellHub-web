import React, { useState, useRef, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇺🇲" },
  {
    code: "ln",
    label: "Lingala",
    flag: "🇨🇩",
  },
  { code: "sw", label: "Swahili", flag: "🇹🇿" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const currentLang = i18n.language || "fr";

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleChangeLanguage = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current =
    languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="cursor-pointer">
      <div ref={ref} className="relative  text-sm">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 cursor-pointer px-3 py-1 bg-white/38 dark:bg-background/10 hover:bg-white/78 dark:hover:bg-accent/20  border rounded hover:shadow transition"
        >
          <span>{current.flag}</span>
          <FaGlobe
            className="text-gray-600 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 
             transition-transform duration-300 hover:rotate-[90deg] cursor-pointer"
          />
        </button>

        {open && (
          <ul className="absolute right-0 mt-2 bg-white dark:bg-gray-700 border rounded shadow z-50 min-w-[120px]">
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => handleChangeLanguage(lang.code)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
