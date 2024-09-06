import React, { createContext, useState, useEffect } from "react";
import {
  addBacToFirestore,
  updateBacInFirestore,
  deleteBacFromFirestore,
  getBacsFromFirestore,
} from "../services/firebaseFirestoreDatabaseService";

export const BacContext = createContext();

export const BacProvider = ({ children, userId }) => {
  const [bacs, setBacs] = useState([]);

  useEffect(() => {
    const fetchBacs = async () => {
      try {
        const fetchedBacs = await getBacsFromFirestore(userId);
        setBacs(fetchedBacs);
      } catch (error) {
        console.error("Error fetching bacs:", error);
      }
    };

    fetchBacs();
  }, [userId]);

  const addBac = async (newBac) => {
    try {
      await addBacToFirestore(userId, newBac);
      const updatedBacs = await getBacsFromFirestore(userId); // Refetch updated bacs
      setBacs(updatedBacs); // Update local state
    } catch (error) {
      console.error("Error adding bac:", error);
    }
  };

  const updateBac = async (id, updatedBac) => {
    try {
      await updateBacInFirestore(userId, id, updatedBac); // Update in Firestore
      const updatedBacs = await getBacsFromFirestore(userId); // Refetch updated bacs
      setBacs(updatedBacs); // Update local state
    } catch (error) {
      console.error("Error updating bac:", error);
    }
  };

  const removeBac = async (type) => {
    const bacToRemove = bacs.find((bac) => bac.type === type);
    if (!bacToRemove) return;

    try {
      await deleteBacFromFirestore(userId, bacToRemove.id); // Delete from Firestore
      const updatedBacs = await getBacsFromFirestore(userId); // Refetch updated bacs
      setBacs(updatedBacs); // Update local state
    } catch (error) {
      console.error("Error deleting bac:", error);
    }
  };

  return (
    <BacContext.Provider value={{ bacs, addBac, updateBac, removeBac }}>
      {children}
    </BacContext.Provider>
  );
};
