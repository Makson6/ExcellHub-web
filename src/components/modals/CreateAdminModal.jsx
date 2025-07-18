import React, { useState } from "react";
import api from "../../api/Axios";
import { toast } from "react-hot-toast";

const CreateAdminModal = ({ onClose }) => {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/api/admin/admin",
        { name: adminName, email: adminEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Admin créé avec succès");
      setAdminName("");
      setAdminEmail("");
      onClose();
    } catch (err) {
      console.error("Erreur création administrateur:", err);

      toast.error(err.response.data.message || "Erreur lors de la création");
    }
  };

  return (
    <div className="fixed bg-sky-200/50 h-3/3 inset-0 flex  justify-center items-center  ">
      <div className="absolute  bg-white dark:bg-midnight my-9 rounded-md p-6 space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold text-center">
          Créer un administrateur
        </h2>
        <input
          placeholder="Nom de l'admin"
          className="p-2 rounded border w-full"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />
        <input
          placeholder="Email de l'admin"
          className="p-2 rounded border w-full"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 dark:hover:bg-dark-bg dark:bg-dark-bg/60 cursor-pointer rounded p-2"
          >
            Annuler
          </button>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white rounded p-2"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminModal;
