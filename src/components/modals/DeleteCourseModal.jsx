import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseURL } from "../../config/config";

const DeleteCourseModal = ({ courseId, onClose }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!reason.trim()) {
      toast.error("Veuillez saisir une raison de suppression.");
      return;
    }

    const toastId = toast.loading("suppression en cours...");
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${baseURL}/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { reason },
      });
      toast.success("Cours supprimé avec succès !", { id: toastId });
      onClose();
    } catch (error) {
      toast.error(
        error.response.data.message || "Erreur lors de la suppression.",
        { id: toastId }
      );
    } finally {
      setLoading(false);
      toast.remove("");
    }
  };

  return (
    <div className="fixed bg-sky-200/50 h-3/3 inset-0 flex  justify-center items-center  ">
      <div className="absolute  bg-white dark:bg-midnight my-9 rounded-md p-6 space-y-4 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Supprimer ce cours</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Raison de la suppression"
          className="w-full h-28 border p-2 rounded resize-none"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 dark:hover:bg-dark-bg dark:bg-dark-bg/60 cursor-pointer rounded p-2"
          >
            Annuler
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded p-2"
          >
            {loading ? "Suppression..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
