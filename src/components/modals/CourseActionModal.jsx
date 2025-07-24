import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/Axios";

const CourseActionModal = ({ course, actionType, onClose }) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleSubmit = async () => {
    const toastId = toast.loading("Traitement en cours...");
    try {
      if (actionType === "approve") {
        await api.put(`/api/admin/approve-course/${course.id}`);
        toast.success("Cours activé avec succès", { id: toastId });
      } else if (actionType === "reject") {
        await api.post(`/api/admin/reject-course/${course.id}`, {
          reason: rejectionReason,
        });
        toast.success("Rejet envoyé au formateur", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du traitement", { id: toastId });
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed bg-sky-200/50 h-3/3 inset-0 flex  justify-center items-center  ">
      <div className="absolute  bg-white dark:bg-midnight my-9 rounded-md p-6 space-y-4 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {actionType === "approve"
            ? "Confirmer l'activation du cours"
            : "Rejeter le cours"}
        </h3>

        {actionType === "reject" && (
          <>
            <label className="block mb-2 text-sm font-medium">
              Motif du rejet
            </label>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700"
              placeholder="Ex: Contenu insuffisant, non conforme..."
            />
          </>
        )}

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 cursor-pointer bg-gray-300 dark:bg-gray-700 rounded"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className={`px-3 py-1 rounded ${
              actionType === "approve"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {actionType === "approve" ? "Activer" : "Rejeter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseActionModal;
