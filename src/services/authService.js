// /src/services/authService.js
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

// Function to handle Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // This will give you the user's information
    console.log("User signed in: ", user);
    return user; // You can return the user object for further use if needed
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

// Function to handle Sign-Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};
