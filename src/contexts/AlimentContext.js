import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { differenceInDays } from "date-fns";
import {
  addAlimentToFirestore,
  updateAlimentInFirestore,
  deleteAlimentFromFirestore,
  getAlimentsFromFirestore,
} from "../services/firebaseFirestoreDatabaseService";

export const AlimentContext = createContext();

export const AlimentProvider = ({ children, userId }) => {
  const [aliments, setAliments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch aliments when userId changes
  useEffect(() => {
    const fetchAliments = async () => {
      if (!userId) return;
      setLoading(true);

      try {
        const fetchedAliments = await getAlimentsFromFirestore(userId);
        setAliments(fetchedAliments);
      } catch (error) {
        console.error("Error fetching aliments: ", error);
        setError("Error fetching aliments");
      } finally {
        setLoading(false);
      }
    };

    fetchAliments();
  }, [userId]);

  // Generate notifications based on aliment expiration dates
  useEffect(() => {
    const today = new Date();
    const updatedNotifications = aliments
      .filter((aliment) => {
        const expirationDate = new Date(aliment.expirationDate);
        const diffDays = differenceInDays(expirationDate, today);
        return diffDays <= 10 || diffDays < 0;
      })
      .map((aliment) => {
        const expirationDate = new Date(aliment.expirationDate);
        const diffDays = differenceInDays(expirationDate, today);
        let color = "green";
        let message = "";

        if (diffDays < 0) {
          color = "red";
          message = `Expired ${Math.abs(diffDays)} day${
            Math.abs(diffDays) !== 1 ? "s" : ""
          } ago`;
        } else if (diffDays === 0) {
          color = "orange";
          message = "Expires today";
        } else if (diffDays <= 3) {
          color = "orange";
          message = `Expires in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
        } else {
          message = `Expires in ${diffDays} day${diffDays !== 1 ? "s" : ""}`;
        }

        return { ...aliment, color, message };
      });

    setNotifications(updatedNotifications);
  }, [aliments]);

  // Memoized function to add a new aliment
  const addAliment = useCallback(
    async (newAliment) => {
      try {
        await addAlimentToFirestore(userId, newAliment);
        const updatedAliments = await getAlimentsFromFirestore(userId);
        setAliments(updatedAliments);
      } catch (error) {
        console.error("Error adding aliment:", error);
        setError("Error adding aliment");
      }
    },
    [userId]
  );

  // Memoized function to update an aliment
  const updateAliment = useCallback(
    async (updatedAliment) => {
      try {
        await updateAlimentInFirestore(
          userId,
          updatedAliment.id,
          updatedAliment
        );
        const updatedAliments = await getAlimentsFromFirestore(userId);
        setAliments(updatedAliments);
      } catch (error) {
        console.error("Error updating aliment:", error);
        setError("Error updating aliment");
      }
    },
    [userId]
  );

  // Memoized function to delete an aliment
  const deleteAliment = useCallback(
    async (id) => {
      try {
        await deleteAlimentFromFirestore(userId, id);
        const updatedAliments = await getAlimentsFromFirestore(userId);
        setAliments(updatedAliments);
      } catch (error) {
        console.error("Error deleting aliment:", error);
        setError("Error deleting aliment");
      }
    },
    [userId]
  );

  // Decrement aliment quantity by 1
  const decrementAlimentQuantity = useCallback(
    async (id) => {
      const aliment = aliments.find((aliment) => aliment.id === id);
      if (aliment && aliment.quantity > 0) {
        const updatedAliment = {
          ...aliment,
          quantity: Math.max(aliment.quantity - 1, 0),
        };
        await updateAliment(updatedAliment);
      }
    },
    [aliments, updateAliment]
  );

  // Increment aliment quantity by 1
  const incrementAlimentQuantity = useCallback(
    async (id) => {
      const aliment = aliments.find((aliment) => aliment.id === id);
      if (aliment) {
        const updatedAliment = { ...aliment, quantity: aliment.quantity + 1 };
        await updateAliment(updatedAliment);
      }
    },
    [aliments, updateAliment]
  );

  // Update multiple aliments (used during reassignment or bulk updates)
  const updateMultipleAliments = useCallback(
    async (updatedAliments) => {
      const updated = aliments.map((aliment) => {
        const match = updatedAliments.find((item) => item.id === aliment.id);
        return match ? { ...aliment, type: match.type } : aliment;
      });
      setAliments(updated);
    },
    [aliments]
  );

  // Mark a notification as read
  const markNotificationAsRead = useCallback(
    (id) => {
      setNotifications(
        notifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    },
    [notifications]
  );

  // Delete a notification
  const deleteNotification = useCallback(
    (id) => {
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    },
    [notifications]
  );

  // Calculate unread notification count
  const unreadNotificationsCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  // Memoized value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      aliments,
      setAliments,
      addAliment,
      decrementAlimentQuantity,
      incrementAlimentQuantity,
      updateAliment,
      updateMultipleAliments,
      deleteAliment,
      notifications,
      markNotificationAsRead,
      deleteNotification,
      unreadNotificationsCount,
      loading,
      error,
    }),
    [
      aliments,
      addAliment,
      decrementAlimentQuantity,
      incrementAlimentQuantity,
      updateAliment,
      updateMultipleAliments,
      deleteAliment,
      notifications,
      markNotificationAsRead,
      deleteNotification,
      unreadNotificationsCount,
      loading,
      error,
    ]
  );

  return (
    <AlimentContext.Provider value={value}>{children}</AlimentContext.Provider>
  );
};
