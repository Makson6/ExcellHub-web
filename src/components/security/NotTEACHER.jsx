import React, { useEffect } from "react";
import {
  MdLockOutline,
  MdOutlineNoAccounts,
  MdOutlinePersonAddAlt1,
} from "react-icons/md";
import { Link } from "react-router-dom";

export default function UserNotTEACHER() {
  return (
    <div className="mx-auto mt-32  flex items-center justify-center text-center">
      <div className="max-w-xl m-6 bg-white dark:bg-dark-bg/70 rounded-lg shadow-lg p-10">
        <div className="text-6xl text-[var(--light-accent)] mb-4 flex justify-center">
          <MdLockOutline />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Accès refusé
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Vous n'êtes pas éligible à cette page, c'est un Espace reservé aux
          Professeurs.
        </p>

        <div className="flex w-full items-center justify-center h-30 overflow-hidden  rounded-lg mt-3">
          <div className="text-6xl text-gray-500 flex justify-center">
            <MdOutlinePersonAddAlt1 />
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300  ">
          Voulez-vous aussi en faire partie {""}?{" "}
          <span>
            Merci de nous lesser un message via la page{" "}
            <Link to="/contact" className="text-accent">
              Contact
            </Link>{" "}
          </span>
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 flex items-center justify-center gap-2">
          <MdOutlineNoAccounts className="text-lg" />
          Accès réservé aux utilisateurs Proffesseurs
        </p>
      </div>
    </div>
  );
}
