import React from "react";
import api from "../../api/Axios";
import { toast } from "react-hot-toast";

const SuspendUserModal = ({ user, onClose }) => {
  const handleSuspend = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.patch(
        `/api/admin/users/${user.id}/suspend`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Utilisateur suspendu avec succès");
      onClose();
    } catch (err) {
      console.error("Erreur suspension:", err);
      toast.error("Erreur lors de la suspension");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-60 z-50">
      <div className="bg-white rounded p-6 space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold">Suspendre {user?.name}</h2>
        <p>Êtes-vous sûr de vouloir suspendre cet utilisateur ?</p>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="bg-gray-300 rounded p-2">
            Annuler
          </button>
          <button
            onClick={handleSuspend}
            className="bg-red-600 text-white rounded p-2"
          >
            Suspendre
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendUserModal;
