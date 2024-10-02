// /src/services/trayService.js
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

// Fetch all trays for the current user
export const fetchTrays = async (userId) => {
  if (!userId) throw new Error("User ID is required to fetch trays.");

  try {
    const trayCollection = collection(db, `users/${userId}/trays`);
    const traySnapshot = await getDocs(trayCollection);

    return traySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching trays:", error);
    throw new Error("Could not fetch trays. Please try again.");
  }
};

// Function to add a new tray
export const addTray = async (userId, trayData) => {
  if (!userId || !trayData)
    throw new Error("User ID and tray data are required.");

  try {
    // Basic validation: check for valid tray name and capacity
    if (!trayData.name || trayData.capacity <= 0) {
      throw new Error("Invalid tray data. Name and capacity must be valid.");
    }

    const trayCollection = collection(db, `users/${userId}/trays`);
    await addDoc(trayCollection, trayData); // Add the new tray to Firestore
  } catch (error) {
    console.error("Error adding tray:", error);
    throw new Error("Could not add tray. Please try again.");
  }
};

// Function to update an existing tray
export const updateTray = async (userId, trayId, trayData) => {
  if (!userId || !trayId || !trayData)
    throw new Error("User ID, tray ID, and tray data are required.");

  try {
    const trayDocRef = doc(db, `users/${userId}/trays`, trayId);
    await updateDoc(trayDocRef, trayData);
  } catch (error) {
    console.error("Error updating tray:", error);
    throw new Error("Could not update tray. Please try again.");
  }
};

// Function to update tray aliments
export const updateTrayAliments = async (userId, trayId, alimentData) => {
  if (!userId || !trayId || !Array.isArray(alimentData)) {
    throw new Error("User ID, tray ID, and valid aliment data are required.");
  }

  try {
    const trayDocRef = doc(db, `users/${userId}/trays`, trayId);
    await updateDoc(trayDocRef, {
      aliments: alimentData,
    });
  } catch (error) {
    console.error("Error updating tray aliments:", error);
    throw new Error("Could not update tray aliments. Please try again.");
  }
};

// Function to delete a tray
export const deleteTray = async (userId, trayId) => {
  if (!userId || !trayId)
    throw new Error("User ID and tray ID are required to delete a tray.");

  try {
    const trayDocRef = doc(db, `users/${userId}/trays`, trayId);
    await deleteDoc(trayDocRef); // Delete the tray document from Firestore
  } catch (error) {
    console.error("Error deleting tray:", error);
    throw new Error("Could not delete tray. Please try again.");
  }
};
