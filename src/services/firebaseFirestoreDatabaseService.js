// src/services/firebaseFirestoreDatabaseService.js
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import app from "./firebaseApp";

const db = getFirestore(app);

export const createUserProfile = async (user) => {
  const userDocRef = doc(db, "users", user.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email, firstName, lastName } = user;
    try {
      await setDoc(userDocRef, {
        email,
        firstName,
        lastName,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  }
};

export const getUserProfile = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    if (error.code === "permission-denied") {
      console.error("Permission denied");
      throw new Error("You do not have permission to access this resource.");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

// Correctly define and export updateUserProfileInFirestore
export const updateUserProfileInFirestore = async (uid, updatedProfile) => {
  const userDocRef = doc(db, "users", uid);

  try {
    await updateDoc(userDocRef, updatedProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

// Other functions remain unchanged...
export const addAliment = async (userId, aliment) => {
  const alimentsRef = collection(db, "users", userId, "aliments");
  await addDoc(alimentsRef, aliment);
};

export const updateAliment = async (userId, alimentId, updatedAliment) => {
  const alimentDocRef = doc(db, "users", userId, "aliments", alimentId);
  await updateDoc(alimentDocRef, updatedAliment);
};

export const deleteAliment = async (userId, alimentId) => {
  const alimentDocRef = doc(db, "users", userId, "aliments", alimentId);
  await deleteDoc(alimentDocRef);
};

export const getAliments = async (userId) => {
  const alimentsRef = collection(db, "users", userId, "aliments");
  const querySnapshot = await getDocs(alimentsRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
