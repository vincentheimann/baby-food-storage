import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  addBacToFirestore,
  updateBacInFirestore,
  deleteBacFromFirestore,
  getBacsFromFirestore,
} from "../services/firebaseFirestoreDatabaseService";

export const BacContext = createContext();

export const BacProvider = ({ children, userId }) => {
  const [bacs, setBacs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bacs when userId is available
  useEffect(() => {
    const fetchBacs = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const fetchedBacs = await getBacsFromFirestore(userId);
        setBacs(fetchedBacs);
      } catch (error) {
        console.error("Error fetching bacs:", error);
        setError("Error fetching bacs");
      } finally {
        setLoading(false);
      }
    };

    fetchBacs();
  }, [userId]);

  // Memoized function to add a bac
  const addBac = useCallback(
    async (newBac) => {
      const optimisticBacs = [...bacs, { ...newBac, id: "temp-id" }];
      setBacs(optimisticBacs);

      try {
        await addBacToFirestore(userId, newBac);
        const updatedBacs = await getBacsFromFirestore(userId);
        setBacs(updatedBacs);
      } catch (error) {
        console.error("Error adding bac:", error);
        setBacs(bacs); // Revert optimistic update
        setError("Error adding bac");
      }
    },
    [bacs, userId]
  );

  // Memoized function to update a bac
  const updateBac = useCallback(
    async (id, updatedBac) => {
      try {
        await updateBacInFirestore(userId, id, updatedBac);
        const updatedBacs = bacs.map((bac) =>
          bac.id === id ? { ...bac, ...updatedBac } : bac
        );
        setBacs(updatedBacs);
      } catch (error) {
        console.error("Error updating bac:", error);
        setError("Error updating bac");
      }
    },
    [bacs, userId]
  );

  // Memoized function to remove a bac
  const removeBac = useCallback(
    async (type) => {
      const bacToRemove = bacs.find((bac) => bac.type === type);
      if (!bacToRemove) return;

      const optimisticBacs = bacs.filter((bac) => bac.type !== type);
      setBacs(optimisticBacs);

      try {
        await deleteBacFromFirestore(userId, bacToRemove.id);
        const updatedBacs = await getBacsFromFirestore(userId);
        setBacs(updatedBacs);
      } catch (error) {
        console.error("Error deleting bac:", error);
        setBacs(bacs); // Revert optimistic update
        setError("Error deleting bac");
      }
    },
    [bacs, userId]
  );

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ bacs, addBac, updateBac, removeBac, loading, error }),
    [bacs, addBac, updateBac, removeBac, loading, error]
  );

  return <BacContext.Provider value={value}>{children}</BacContext.Provider>;
};
