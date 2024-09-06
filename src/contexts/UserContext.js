import React, { createContext, useState, useContext, useEffect } from "react";
import {
  login,
  logout,
  signUp,
  updatePassword,
  resetPassword,
  sendVerificationEmail,
} from "../services/firebaseAuthService";
import {
  createUserProfile,
  updateUserProfileInFirestore,
} from "../services/firebaseFirestoreDatabaseService";

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

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;
      await createUserProfile(user);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed: ", error);
      setError("Invalid credentials. Please try again.");
      throw error; // Rethrow to be caught in LoginPage if necessary
    }
  };

  const handleSignUp = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      await createUserProfile({
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
      });

      // Send email verification
      await sendVerificationEmail(user);

      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Sign-up failed: ", error);
      setError("Sign-up failed. Please try again.");
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

  const updateUserProfile = async (profileData) => {
    try {
      if (user) {
        await updateUserProfileInFirestore(user.uid, profileData);
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      setError("You do not have permission to update this profile.");
    }
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    try {
      await updatePassword(currentPassword, newPassword);
    } catch (error) {
      console.error("Password update failed in UserContext:", error);
      throw error; // Rethrow the error so that ProfilePage can catch it
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        signUp: handleSignUp,
        updateUserProfile,
        updateUserPassword,
        resetPassword,
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
