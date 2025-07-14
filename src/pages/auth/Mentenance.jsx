import React from "react";
import { FaTools } from "react-icons/fa";

export default function MaintenancePage() {
  return (
    <div className="h-fit dark:bg-[var(--dark-background)] flex items-center justify-center p-6 text-center">
      <div className="max-w-xl bg-[var(--light-zinc)] dark:bg-[var(--dark-primary)] rounded-lg shadow-lg p-10">
        <div className="text-5xl text-yellow-500 mb-4 flex justify-center">
          <FaTools />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Page en maintenance
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Nous effectuons actuellement une mise à jour pour améliorer votre
          expérience. Veuillez revenir plus tard.
        </p>

        <div className="relative w-full h-40 overflow-hidden rounded-lg">
          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="Maintenance"
            className="w-full h-full text-amber-500 object-contain"
          />
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Merci de votre patience. – L'équipe velovo technique
        </p>
      </div>
    </div>
  );
}
