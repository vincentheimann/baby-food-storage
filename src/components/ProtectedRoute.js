// src/components/ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Element {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
