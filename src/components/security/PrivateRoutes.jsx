import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  return isAuthenticated
    ? children
    : (toast.error("Please login first!"),
      (
        // : (toast.error("Please login first!"),
        <Navigate to="/login" replace state={{ from: location }} />
      ));
};

export default ProtectedRoute;
