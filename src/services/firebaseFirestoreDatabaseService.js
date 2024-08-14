// src/services/firebaseFirestoreDatabaseService.js
import { getFirestore } from "firebase/firestore";
import app from "./firebaseApp";

const db = getFirestore(app);

// Example function to add a food item
export const addFoodItem = async (userId, foodItem) => {
  const docRef = db
    .collection("users")
    .doc(userId)
    .collection("foodItems")
    .doc();
  await docRef.set(foodItem);
};

export default db;
