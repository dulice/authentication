import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(state => state.user);
  return user ? children : <Navigate to="/login" />;
};

export const CheckEmailRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/email" />;
};

export default ProtectedRoute;
