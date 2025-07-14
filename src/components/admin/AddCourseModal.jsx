import React, { useState } from "react";
import api from "../../api/Axios";
import { toast } from "react-hot-toast";

const AddCourseModal = ({ onClose }) => {
  const [title, setTitle] = useState("");

  const handleAdd = async (status) => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/api/admin/courses",
        { title, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(
        `Cours ${status === "PUBLISHED" ? "publié" : "en attente"}`
      );
      setTitle("");
      onClose();
    } catch (err) {
      console.error("Erreur ajout cours:", err);
      toast.error("Erreur lors de l'ajout du cours");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-60 z-50">
      <div className="bg-white rounded p-6 space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold">Ajouter un cours</h2>
        <input
          placeholder="Titre du cours"
          className="p-2 rounded border w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-col space-y-2">
          <button
            className="bg-yellow-500 text-white rounded p-2"
            onClick={() => handleAdd("IN_CHECKING")}
          >
            Ajouter comme En attente
          </button>
          <button
            className="bg-green-600 text-white rounded p-2"
            onClick={() => handleAdd("PUBLISHED")}
          >
            Ajouter comme Publié
          </button>
          <button onClick={onClose} className="bg-gray-300 rounded p-2">
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
