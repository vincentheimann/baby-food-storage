import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth
import { googleLogin, logout } from "../services/firebaseAuthService";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Use onAuthStateChanged to monitor sign-in state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

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
        loading, // Provide loading state
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
