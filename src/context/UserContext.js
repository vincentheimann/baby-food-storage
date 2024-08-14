import React, { createContext, useState, useContext, useEffect } from "react";
import { login, logout, demoLogin } from "../services/firebaseAuthService";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    return savedAuth === "true";
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", true);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    }
  }, [user]);

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
export { UserProvider };
export { UserContext };
