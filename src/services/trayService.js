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
  try {
    const trayCollection = collection(db, `users/${userId}/trays`);
    const traySnapshot = await getDocs(trayCollection);
    const trayList = traySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return trayList;
  } catch (error) {
    console.error("Error fetching trays:", error);
    throw new Error("Could not fetch trays. Please try again.");
  }
};

// Function to add a new tray
export const addTray = async (userId, trayData) => {
  try {
    // Basic validation: check for valid tray name and capacity
    if (!trayData.name || trayData.capacity <= 0) {
      throw new Error(
        "Invalid tray data. Please provide a valid name and capacity."
      );
    }

    const trayCollection = collection(db, `users/${userId}/trays`);
    await addDoc(trayCollection, trayData); // Add the new tray to Firestore
  } catch (error) {
    console.error("Error adding tray:", error);
    throw new Error("Could not add tray. Please try again.");
  }
};

// Function to update a tray with new aliment quantities
export const updateTrayAliments = async (userId, trayId, alimentData) => {
  try {
    if (!alimentData || !Array.isArray(alimentData)) {
      throw new Error("Invalid aliment data.");
    }

    const trayDocRef = doc(db, `users/${userId}/trays`, trayId);
    await updateDoc(trayDocRef, {
      aliments: alimentData,
    });
  } catch (error) {
    console.error("Error updating tray aliments:", error);
    throw new Error("Could not update tray aliments. Please try again.");
  }
};

// Function to update an existing tray
export const updateTray = async (trayId, trayData) => {
  try {
    const trayDocRef = doc(db, `users/${trayId}/trays`, trayId);
    await updateDoc(trayDocRef, trayData);
  } catch (error) {
    console.error("Error updating tray:", error);
    throw new Error("Could not update tray. Please try again.");
  }
};
