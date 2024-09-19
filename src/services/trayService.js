// /src/services/trayService.js
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

// Fetch all trays for the current user
export const fetchTrays = async (userId) => {
  const trayCollection = collection(db, `users/${userId}/trays`);
  const traySnapshot = await getDocs(trayCollection);
  const trayList = traySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return trayList;
};

// Function to add a new tray
export const addTray = async (userId, trayData) => {
  const trayCollection = collection(db, `users/${userId}/trays`);
  await addDoc(trayCollection, trayData); // Add the new tray to Firestore
};

// Function to update a tray with new aliment quantities
export const updateTrayAliments = async (userId, trayId, alimentData) => {
  const trayDocRef = doc(db, `users/${userId}/trays`, trayId);
  await updateDoc(trayDocRef, {
    aliments: alimentData,
  });
};
