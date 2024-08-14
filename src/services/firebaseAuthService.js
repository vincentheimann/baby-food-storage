// src/services/firebaseAuthService.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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
