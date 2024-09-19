// /src/services/alimentService.js
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

// Fetch all aliments for the current user
export const fetchAliments = async (userId) => {
  try {
    const alimentCollection = collection(db, `users/${userId}/aliments`);
    const alimentSnapshot = await getDocs(alimentCollection);
    const alimentList = alimentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Fetch aliment data (name, type, totalQuantity, trays)
    }));
    return alimentList;
  } catch (error) {
    console.error("Error fetching aliments:", error);
    throw new Error("Could not fetch aliments. Please try again.");
  }
};

// Function to add a new aliment
export const addAliment = async (userId, alimentData) => {
  try {
    // Basic data validation before adding the aliment
    if (!alimentData.name || alimentData.totalQuantity <= 0) {
      throw new Error(
        "Invalid aliment data. Please provide valid information."
      );
    }

    const alimentCollection = collection(db, `users/${userId}/aliments`);
    await addDoc(alimentCollection, alimentData); // Store aliment with tray references
  } catch (error) {
    console.error("Error adding aliment:", error);
    throw new Error("Could not add aliment. Please try again.");
  }
};

// Function to update an existing aliment
export const updateAliment = async (userId, alimentId, alimentData) => {
  try {
    const alimentDocRef = doc(db, `users/${userId}/aliments`, alimentId);
    await updateDoc(alimentDocRef, alimentData); // Update the aliment in Firestore
  } catch (error) {
    console.error("Error updating aliment:", error);
    throw new Error("Could not update aliment. Please try again.");
  }
};
