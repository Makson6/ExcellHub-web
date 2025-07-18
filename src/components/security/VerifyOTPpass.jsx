import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
//@ts-ignore
import { motion } from "framer-motion";
import api from "../../api/Axios.js";

function VerifyForgotPassword() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState("loading");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const code = searchParams.get("code");

  useEffect(() => {
    async function verify() {
      if (!code) {
        setIsLoading("error");
        setMessage("Code de vérification manquant.");
        return;
      }

      try {
        const res = await api.put(
          "/api/users/active-user-account-status",
          code
        );
        setIsLoading("success");
        setMessage(res.data.message || "Email vérifié avec succès !");
        setTimeout(() => navigate("/dashboard/my-profile"), 3000); // rediriger après 3s
      } catch (err) {
        console.error(err);
        setIsLoading("error");
        setMessage("Une erreur est survenue lors de la vérification.");
        setTimeout(() => navigate("/"), 4000); // retour accueil après 4s
      }
    }

    verify();
  }, [code, navigate]);

  const renderContent = () => {
    switch (isLoading) {
      case "loading":
        return (
          <>
            <Loader2 className="animate-spin text-blue-500 w-12 h-12 mb-4" />
            <p className="text-lg font-medium">Vérification en cours...</p>
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="text-green-500 w-14 h-14 mb-3" />
            <p className="text-xl font-semibold text-green-700">{message}</p>
            <p className="text-sm mt-2 text-gray-500">
              Redirection vers la page de connexion...
            </p>
          </>
        );
      case "error":
        return (
          <>
            <XCircle className="text-red-500 w-14 h-14 mb-3" />
            <p className="text-xl font-semibold text-red-700">{message}</p>
            <p className="text-sm mt-2 text-gray-500">
              Redirection vers la page d’accueil...
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center h-screen bg-gray-50"
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
        {renderContent()}
      </div>
    </motion.div>
  );
}

export default VerifyForgotPassword;
