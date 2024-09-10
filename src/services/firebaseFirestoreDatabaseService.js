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
  writeBatch,
} from "firebase/firestore";
import app from "./firebaseApp";

const db = getFirestore(app);

// Create user profile
export const createUserProfile = async (user) => {
  try {
    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { email, displayName, emailVerified } = user;
      await setDoc(userDocRef, {
        email,
        displayName: displayName || "",
        emailVerified: emailVerified || false,
        createdAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Error in createUserProfile:", error);
    throw error; // Propagate the error if necessary
  }
};

// Get user profile
export const getUserProfile = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      throw new Error("User profile not found");
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Update user profile
export const updateUserProfileInFirestore = async (uid, updatedProfile) => {
  const userDocRef = doc(db, "users", uid);

  try {
    await updateDoc(userDocRef, updatedProfile);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Function to delete all bacs and aliments related to the user
export const deleteUserDataFromFirestore = async (userId) => {
  try {
    // Delete all bacs
    const bacsRef = collection(db, "users", userId, "bacs");
    const bacsSnapshot = await getDocs(bacsRef);
    const batch = writeBatch(db);

    bacsSnapshot.forEach((bacDoc) => {
      batch.delete(bacDoc.ref);
    });

    // Delete all aliments
    const alimentsRef = collection(db, "users", userId, "aliments");
    const alimentsSnapshot = await getDocs(alimentsRef);

    alimentsSnapshot.forEach((alimentDoc) => {
      batch.delete(alimentDoc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("Error deleting user data:", error);
    throw error;
  }
};

// Functions for managing "bacs"

// Add a new bac
export const addBacToFirestore = async (userId, bac) => {
  try {
    const bacsRef = collection(db, "users", userId, "bacs");
    const docRef = await addDoc(bacsRef, bac);
    return docRef.id; // Return the ID if needed
  } catch (error) {
    console.error("Error adding bac:", error);
    throw error;
  }
};

// Update a bac
export const updateBacInFirestore = async (userId, bacId, updatedBac) => {
  try {
    const bacDocRef = doc(db, "users", userId, "bacs", bacId);
    await updateDoc(bacDocRef, updatedBac);
  } catch (error) {
    console.error("Error updating bac:", error);
    throw error;
  }
};

// Delete a bac
export const deleteBacFromFirestore = async (userId, bacId) => {
  try {
    const bacDocRef = doc(db, "users", userId, "bacs", bacId);
    await deleteDoc(bacDocRef);
  } catch (error) {
    console.error("Error deleting bac:", error);
    throw error;
  }
};

// Get all bacs for a user
export const getBacsFromFirestore = async (userId) => {
  try {
    const bacsRef = collection(db, "users", userId, "bacs");
    const querySnapshot = await getDocs(bacsRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting bacs:", error);
    throw error;
  }
};

// Functions for managing "aliments"

// Add a new aliment
export const addAlimentToFirestore = async (userId, aliment) => {
  try {
    const alimentsRef = collection(db, "users", userId, "aliments");
    const docRef = await addDoc(alimentsRef, aliment);
    return docRef.id;
  } catch (error) {
    console.error("Error adding aliment:", error);
    throw error;
  }
};

// Update an aliment
export const updateAlimentInFirestore = async (
  userId,
  alimentId,
  updatedAliment
) => {
  try {
    const alimentDocRef = doc(db, "users", userId, "aliments", alimentId);
    await updateDoc(alimentDocRef, updatedAliment);
  } catch (error) {
    console.error("Error updating aliment:", error);
    throw error;
  }
};

// Delete an aliment
export const deleteAlimentFromFirestore = async (userId, alimentId) => {
  try {
    const alimentDocRef = doc(db, "users", userId, "aliments", alimentId);
    await deleteDoc(alimentDocRef);
  } catch (error) {
    console.error("Error deleting aliment:", error);
    throw error;
  }
};

// Get all aliments for a user
export const getAlimentsFromFirestore = async (userId) => {
  try {
    const alimentsRef = collection(db, "users", userId, "aliments");
    const querySnapshot = await getDocs(alimentsRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting aliments:", error);
    throw error;
  }
};

// Batch update multiple aliments
export const updateMultipleAlimentsInFirestore = async (userId, aliments) => {
  const batch = writeBatch(db);
  aliments.forEach((aliment) => {
    const alimentDocRef = doc(db, "users", userId, "aliments", aliment.id);
    batch.update(alimentDocRef, aliment);
  });

  try {
    await batch.commit();
  } catch (error) {
    console.error("Error updating multiple aliments:", error);
    throw error;
  }
};
