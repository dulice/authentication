import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

export const CheckEmailRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("email"));
  return user ? children : <Navigate to="/email" />;
};

export default ProtectedRoute;
