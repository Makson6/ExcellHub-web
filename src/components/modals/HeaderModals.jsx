// import React from "react";
// import { LogOut, SquareArrowOutUpRight } from "lucide-react";
// import { useAuthStore } from "../../store/useAuthStore"; // Chemin corrigé
// import { useNavigate, NavLink } from "react-router-dom";
// import PropTypes from "prop-types";
// import ThemeToggle from "../ThemeToggle";
// import { MdVerified } from "react-icons/md";
// import { useTranslation } from "react-i18next";
// import LanguageSelector from "../LanguageSelector";

// export function ProfileMenu({ onLogout }) {
//   const { user, authLoading } = useAuthStore();
//   const navigate = useNavigate();

//   return (
//     <div className="bg-zinc-50 dark:bg-gray-900 dark:text-white text-black rounded-md shadow-md p-4 w-56">
//       <div
//         className="absolute right-4 top-4 cursor-pointer hover:opacity-70"
//         onClick={() => navigate("/profile")}
//         title="Voir les infos complètes"
//       >
//         <SquareArrowOutUpRight size={20} />
//       </div>

//       <strong className="flex justify-center items-center gap-1 mb-2">
//         {user?.status === "verified" && (
//           <MdVerified size={14} className="text-green-600" />
//         )}
//         Mon compte
//       </strong>
//       <hr className="mb-2" />

//       {authLoading ? (
//         <p className="text-center text-sm italic">Chargement...</p>
//       ) : (
//         <>
//           <p className="text-center font-bold">{user?.name || "Utilisateur"}</p>
//           <p className="text-center text-sm">{user?.email}</p>
//           <div className="flex justify-center">
//             <p
//               onClick={() => navigate("/dashboard/my-profile")}
//               className="cursor-pointer my-1.5 hover:text-yellow-300 hover:underline"
//             >
//               Dashboard
//             </p>
//           </div>
//         </>
//       )}

//       <button
//         onClick={onLogout}
//         className="flex mt-3 justify-center text-red-400 hover:text-red-500 hover:underline w-full"
//       >
//         Déconnexion
//       </button>
//     </div>
//   );
// }

// ProfileMenu.propTypes = {
//   onLogout: PropTypes.func.isRequired,
// };

// export function MobileMenu({ onClose, isAuthenticated, onLogout }) {
//   const { t } = useTranslation("navbar");
//   const links = [
//     { path: "/", label: "Accueil" },
//     { path: "/courses", label: t("allCourses") },
//     { path: "/dashboard", label: t("dashboard") },
//     { path: "/admin-dashboard", label: t("admin") },
//     { path: "/teacher-dashboard", label: t("teacher") },
//     { path: "/student-dashboard", label: t("student") },
//     { path: "/about", label: t("about") },
//     { path: "/contact", label: "Contacts" },
//   ];

//   return (
//     <nav className="sm:hidden  space-y-8 absolute text-right right-0 top-16 bg-inherit p-6 w-2/3 rounded shadow-lg text-black dark:bg-inherit dark:text-white">
//       <div className="flex mr-6 flex-col space-y-1">
//         {links.map((link) => (
//           <NavLink
//             key={link.path}
//             to={link.path}
//             onClick={onClose}
//             className={({ isActive }) =>
//               isActive ? "text-inherit font-bold underline" : "hover:underline"
//             }
//           >
//             {link.label}
//           </NavLink>
//         ))}

//         <div className=" flex gap-2 justify-end w-full ">
//           <ThemeToggle />
//           <LanguageSelector />
//         </div>
//       </div>
//       <div className="pr-6">
//         {!isAuthenticated ? (
//           <NavLink
//             to="/login"
//             onClick={onClose}
//             className={({ isActive }) =>
//               isActive
//                 ? "text-inherit cursor-pointer font-bold underline"
//                 : "cursor-pointer hover:underline"
//             }
//           >
//             {t("login")}
//           </NavLink>
//         ) : (
//           <button
//             onClick={() => {
//               if (onLogout) {
//                 onLogout();
//               }
//               onClose();
//             }}
//             className="text-left cursor-pointer hover:underline"
//           >
//             {t("logout")}
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// MobileMenu.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired,
//   onLogout: PropTypes.func,
// };
