import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import handleApiError from "../../utils/handleApiError"; // Chemin à adapter si besoin

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    const fakeError = {
      response: {
        status: 401,
        // data: { error: "Veuillez vous connecter." },
      },
    };
    handleApiError(fakeError);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
