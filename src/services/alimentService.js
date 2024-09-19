// /src/services/alimentService.js
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

// Fetch all aliments for the current user
export const fetchAliments = async (userId) => {
  const alimentCollection = collection(db, `users/${userId}/aliments`);
  const alimentSnapshot = await getDocs(alimentCollection);
  const alimentList = alimentSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // Fetch aliment data (name, type, totalQuantity, trays)
  }));
  return alimentList;
};

// Function to add a new aliment
export const addAliment = async (userId, alimentData) => {
  const alimentCollection = collection(db, `users/${userId}/aliments`);
  await addDoc(alimentCollection, alimentData); // Store aliment with tray references
};
