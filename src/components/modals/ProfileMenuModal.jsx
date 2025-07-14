import React from "react";
import { SquareArrowOutUpRight } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { MdVerified } from "react-icons/md";

export function ProfileMenu({ onLogout }) {
  const { user, authLoading } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-50 dark:bg-midnight dark:text-white text-black rounded-md shadow-md p-4 w-56">
      <div
        className="absolute right-4 top-4 cursor-pointer hover:opacity-70"
        onClick={() => navigate("/dashboard/profile")}
        title="Voir les infos complètes"
      >
        <SquareArrowOutUpRight size={20} />
      </div>

      <strong className="flex justify-center items-center gap-1 mb-2">
        {user?.status === "verified" && (
          <MdVerified size={14} className="text-green-600" />
        )}
        Mon compte
      </strong>
      <hr className="mb-2" />

      {authLoading ? (
        <p className="text-center text-sm italic">Chargement...</p>
      ) : (
        <>
          <p className="text-center font-bold">{user?.name || "Utilisateur"}</p>
          <p className="text-center text-sm">{user?.email}</p>
          <div className="flex justify-center">
            <p
              onClick={() => navigate("/dashboard/my-profile")}
              className="cursor-pointer my-1.5 hover:text-midnight dark:hover:text-accent hover:underline"
            >
              Dashboard
            </p>
          </div>
        </>
      )}

      <button
        onClick={onLogout}
        className="flex mt-3 cursor-pointer justify-center text-red-400 hover:text-red-500 hover:underline w-full"
      >
        Déconnexion
      </button>
    </div>
  );
}

ProfileMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
