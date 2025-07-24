import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MobileMenu } from "./modals/MobileMenuModal.jsx";
import { ProfileMenu } from "./modals/ProfileMenuModal.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import api from "../api/Axios.js";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { Home, HomeIcon } from "lucide-react";
import { FaHome } from "react-icons/fa";
import {
  MdAddHome,
  MdAddHomeWork,
  MdHome,
  MdHomeFilled,
  MdHomeMax,
} from "react-icons/md";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const { t } = useTranslation("navbar");

  const getInitials = (user) => {
    if (!user?.fullName) return "";
    const names = user.fullName.trim().split(" ");
    const first = names[0]?.charAt(0) ?? "";
    const second = names.length > 1 ? names[1]?.charAt(0) : "";
    return (first + second).toUpperCase();
  };

  const handleLogout = () => {
    api.post("/api/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cookieToken");
    localStorage.removeItem("currentUserId");
    sessionStorage.clear();
    toast.success("Déconnecté !");
    setUser(null);
    navigate("/");
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleProfileClick = () => setProfileMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-secondary  dark:bg-midnight shadow-md">
      <nav className="flex justify-between items-center px-6 py-4">
        <div>
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Excell<span className="text-primary">Hub</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-5">
          {/* Desktop Links */}
          {[
            { to: "/courses", label: t("allCourses") },
            {
              to: "/" && "login",
              label: (
                <div className="flex items-center justify-center ">Home</div>
              ),
            },
            { to: "/dashboard", label: t("dashboard") },
            // { to: "/dashboard/student", label: t("student") },
            // { to: "/dashboard/teacher", label: t("teacher") },
            // { to: "/dashboard/admin", label: t("admin") },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-white underline"
                  : "text-white/80 hover:text-midnight dark:hover:text-accent transition"
              }
            >
              {link.label}
            </NavLink>
          ))}

          <ThemeToggle />
          <LanguageSelector />
        </div>

        {!user && (
          <Link
            to="/login"
            className="hidden md:block md:flex-row  text-sm  ml-4 bg-white/80  text-primary font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            <div className="flex flex-row">
              <span className="mr-2">📝 </span> <span>Login</span>
            </div>
          </Link>
        )}

        {/* Avatar & Profile Menu */}
        {isAuthenticated && user && (
          <div ref={profileRef} className="relative hidden md:block">
            <div
              onClick={handleProfileClick}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-white text-primary font-bold cursor-pointer shadow-md"
              title={user.fullName}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profil"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>{getInitials(user)}</span>
              )}
            </div>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 z-50">
                <ProfileMenu onLogout={handleLogout} />
              </div>
            )}
          </div>
        )}

        {/* Mobile Burger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden cursor-pointer hover:text-primary/40 text-white text-2xl"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <div className="transition-transform duration-600 rotate-90 transform ">
              ☰
            </div>
          ) : (
            <div className="transition-transform duration-600  transform hover:rotate-45 ">
              ☰
            </div>
          )}
        </button>

        {/* Mobile Menu Modal */}
        {menuOpen && (
          <MobileMenu
            onClose={() => setMenuOpen(false)}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
