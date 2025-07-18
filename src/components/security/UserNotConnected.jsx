import React from "react";
import {
  MdLockOutline,
  MdOutlineNoAccounts,
  MdOutlinePersonAddAlt1,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function UserNotConnected() {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-center text-center">
      <div className="max-w-xl mt-35 bg-white dark:bg-dark-bg/70 rounded-lg shadow-lg p-10">
        <div className="text-6xl text-accent mb-4 flex justify-center">
          <MdLockOutline />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Accès refusé
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Vous devez être{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="font-mono hover:font-extrabold cursor-pointer text-accent"
          >
            connecté
          </span>{" "}
          pour accéder à ces données. Veuillez vous authentifier pour continuer.
        </p>

        <div className="relative w-full h-40 overflow-hidden rounded-lg mt-5">
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="text-6xl cursor-pointer text-gray-500 mb-4 flex justify-center"
          >
            <MdOutlinePersonAddAlt1 className="hover:text-accent/60" />
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-center justify-center gap-2">
          <MdOutlineNoAccounts className="text-lg" />
          Accès réservé aux utilisateurs authentifiés
        </p>
      </div>
    </div>
  );
}
