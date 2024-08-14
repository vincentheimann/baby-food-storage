import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import app from "./firebaseApp";

export const auth = getAuth(app);

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const demoLogin = () =>
  signInWithEmailAndPassword(auth, "demo@example.com", "demopassword");

export const updatePassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    await reauthenticateWithCredential(user, credential);
    await firebaseUpdatePassword(user, newPassword);
  } catch (error) {
    console.error("Password update failed: ", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
