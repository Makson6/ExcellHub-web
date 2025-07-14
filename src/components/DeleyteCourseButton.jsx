import React, { useState } from "react";
import axios from "axios";

export default function DeleteCourseButton({ courseId, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?"))
      return;

    setLoading(true);
    setError(null);

    try {
      // Suppose que le token JWT est stocké en localStorage
      const token = localStorage.getItem("token");

      await axios.delete(`/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoading(false);
      if (onDeleted) onDeleted(); // callback pour rafraîchir la liste ou rediriger
      alert("Cours supprimé avec succès.");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.error || "Erreur lors de la suppression du cours"
      );
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Suppression..." : "Supprimer le cours"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
}
