import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/Axios";

const Subscribe = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { courseId, courseTitle } = location.state || {};

  useEffect(() => {
    if (!courseId) {
      toast.error("Aucun cours spécifié.");
      navigate("/courses");
    }
  }, [courseId, navigate]);

  const handleSubscription = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/subscribe", {
        courseId,
      });

      toast.success("Inscription réussie !");
      navigate(`/courses/${courseId}/chapters`);
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      toast.error("Échec de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Inscription</h1>
        <p className="text-center text-gray-700 mb-6">
          Confirmez-vous votre inscription au cours :
        </p>
        <h2 className="text-center text-xl font-semibold mb-4 text-blue-700">
          {courseTitle || "Cours inconnu"} ?
        </h2>

        <button
          onClick={handleSubscription}
          disabled={loading}
          className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Inscription en cours..." : "S'inscrire maintenant"}
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
