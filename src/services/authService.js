// src/services/authService.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsmWLWLhSkpkdxgIGJp0NyCshZzjLBL9M",
  authDomain: "baby-food-storage.firebaseapp.com",
  projectId: "baby-food-storage",
  storageBucket: "baby-food-storage.appspot.com",
  messagingSenderId: "541548181714",
  appId: "1:541548181714:web:00b3bf47d6fce0cbac150b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const demoLogin = () =>
  signInWithEmailAndPassword(auth, "demo@example.com", "demopassword");
