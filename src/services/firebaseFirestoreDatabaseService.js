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
    const { email, displayName } = user;
    try {
      await setDoc(userDocRef, {
        email,
        displayName: displayName || "", // Google users might not have firstName, lastName
        emailVerified: user.emailVerified || false, // Default to false if undefined
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
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred.");
  }
};

export const updateUserProfileInFirestore = async (uid, updatedProfile) => {
  const userDocRef = doc(db, "users", uid);

  try {
    await updateDoc(userDocRef, updatedProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

// Functions for managing "bacs"
export const addBacToFirestore = async (userId, bac) => {
  const bacsRef = collection(db, "users", userId, "bacs");
  await addDoc(bacsRef, bac);
};

export const updateBacInFirestore = async (userId, bacId, updatedBac) => {
  const bacDocRef = doc(db, "users", userId, "bacs", bacId);
  await updateDoc(bacDocRef, updatedBac);
};

export const deleteBacFromFirestore = async (userId, bacId) => {
  const bacDocRef = doc(db, "users", userId, "bacs", bacId);
  await deleteDoc(bacDocRef);
};

export const getBacsFromFirestore = async (userId) => {
  const bacsRef = collection(db, "users", userId, "bacs");
  const querySnapshot = await getDocs(bacsRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Functions for managing "aliments"
export const addAlimentToFirestore = async (userId, aliment) => {
  const alimentsRef = collection(db, "users", userId, "aliments");
  await addDoc(alimentsRef, aliment);
};

export const updateAlimentInFirestore = async (
  userId,
  alimentId,
  updatedAliment
) => {
  const alimentDocRef = doc(db, "users", userId, "aliments", alimentId);
  await updateDoc(alimentDocRef, updatedAliment);
};

export const deleteAlimentFromFirestore = async (userId, alimentId) => {
  const alimentDocRef = doc(db, "users", userId, "aliments", alimentId);
  await deleteDoc(alimentDocRef);
};

export const getAlimentsFromFirestore = async (userId) => {
  const alimentsRef = collection(db, "users", userId, "aliments");
  const querySnapshot = await getDocs(alimentsRef);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
