import React, { createContext, useState, useContext, useEffect } from "react";
import { googleLogin, logout } from "../services/firebaseAuthService";

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

  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", true);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setError("Google login failed");
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
        googleLogin: handleGoogleLogin,
        logout: handleLogout,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export { UserProvider };
export { UserContext };
