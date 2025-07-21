import React, { useState } from "react";
import api from "../../api/Axios";
import { toast } from "react-hot-toast";

const CreateTeacherModal = ({ onClose }) => {
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.post(
        "/api/admin/teachers",
        { name: teacherName, email: teacherEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Formateur créé avec succès");
      setTeacherName("");
      setTeacherEmail("");
      onClose();
    } catch (err) {
      console.error("Erreur création formateur:", err);

      toast.error(err.response.data.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bg-sky-200/50 h-3/3 inset-0 flex  justify-center items-center  ">
      <div className="absolute  bg-white dark:bg-midnight my-9 rounded-md p-6 space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold">Créer un formateur</h2>
        <input
          placeholder="Nom du formateur"
          className="p-2 rounded border w-full"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <input
          placeholder="Email du formateur"
          className="p-2 rounded border w-full"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 dark:hover:bg-dark-bg dark:bg-dark-bg/60 cursor-pointer rounded p-2"
          >
            Annuler
          </button>
          <button
            disabled={loading}
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white rounded p-2"
          >
            {loading ? "Création..." : "Créer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacherModal;
