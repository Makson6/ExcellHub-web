import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si connecté, rend la page demandée
  return children;
};

export default PrivateRoute;
