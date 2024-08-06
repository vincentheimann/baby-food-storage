// src/context/UserContext.js
import React, { createContext, useState, useContext } from "react";
import { login, logout, demoLogin } from "../services/authService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await login(email, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  const handleDemoLogin = async () => {
    try {
      const userCredential = await demoLogin();
      setUser(userCredential.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Demo login failed: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        demoLogin: handleDemoLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
