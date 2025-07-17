import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import ThemeToggle from "../ThemeToggle";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector";

export function MobileMenu({ onClose, isAuthenticated, onLogout }) {
  const { t } = useTranslation("navbar");
  const links = [
    { path: "/", label: t("home") },
    { path: "/courses", label: t("allCourses") },
    { path: "/dashboard", label: t("dashboard") },
    // { path: "/dashboard", label: t("profile") },
    // { path: "/admin-dashboard", label: t("admin") },
    // { path: "/teacher-dashboard", label: t("teacher") },
    // { path: "/student-dashboard", label: t("student") },
    { path: "/about", label: t("about") },
    { path: "/contact", label: "Contacts" },
  ];

  return (
    <nav className="sm:hidden  space-y-8 absolute text-right right-0 top-16 bg-secondary dark:bg-dark-bg p-6 w-2/3 rounded shadow-lg text-black dark:text-white">
      <div className="flex mr-6 flex-col space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "text-inherit font-bold underline"
                : "hover:text-accent"
            }
          >
            {link.label}
          </NavLink>
        ))}

        <div className=" flex gap-2 justify-end w-full ">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>
      <div className="pr-6">
        {!isAuthenticated ? (
          <NavLink
            to="/login"
            onClick={onClose}
            className={({ isActive }) =>
              isActive
                ? "text-inherit cursor-pointer font-bold underline"
                : "cursor-pointer hover:underline"
            }
          >
            {t("login")}
          </NavLink>
        ) : (
          <button
            onClick={() => {
              if (onLogout) {
                onLogout();
              }
              onClose();
            }}
            className="text-left cursor-pointer hover:underline"
          >
            {t("logout")}
          </button>
        )}
      </div>
    </nav>
  );
}

MobileMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func,
};
