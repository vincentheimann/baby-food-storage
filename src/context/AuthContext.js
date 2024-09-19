// /src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { signInWithGoogle, signOutUser } from "../services/authService";

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthContext Provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Ensure this is set to false once the state is set
    });
    return unsubscribe;
  }, []);

  // Sign in function
  const login = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  // Sign out function
  const logout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // The value provided to the components that use this context
  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when not loading */}
    </AuthContext.Provider>
  );
};
