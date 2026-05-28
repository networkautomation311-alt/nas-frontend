import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 * - Checks if user has a valid token
 * - Redirects to / if not logged in
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🚫 Not logged in → redirect to login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
