import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const DeleteCourseModal = ({ courseId, onClose }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!reason.trim()) {
      toast.error("Veuillez saisir une raison de suppression.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      await axios.delete(`/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { reason },
      });
      toast.success("Cours supprimé avec succès !");
      onClose();
    } catch (error) {
      toast.error("Erreur lors de la suppression.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Supprimer ce cours</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Raison de la suppression"
          className="w-full h-28 border p-2 rounded resize-none"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Annuler
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white cursor-pointer rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Suppression..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
