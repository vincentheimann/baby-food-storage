import React, { createContext, useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import { useUser } from "./UserContext";
import {
  addAlimentToFirestore,
  updateAlimentInFirestore,
  deleteAlimentFromFirestore,
  getAlimentsFromFirestore,
} from "../services/firebaseFirestoreDatabaseService";

export const AlimentContext = createContext();

export const AlimentProvider = ({ children, userId }) => {
  const [aliments, setAliments] = useState([]);
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchAliments = async () => {
      if (!userId) return; // Ensure userId is available before fetching
      try {
        const fetchedAliments = await getAlimentsFromFirestore(userId);
        setAliments(fetchedAliments);
      } catch (error) {
        console.error("Error fetching aliments: ", error);
      }
    };
    fetchAliments();
  }, [user, userId]);

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

  const addAliment = async (newAliment) => {
    try {
      await addAlimentToFirestore(userId, newAliment);
      const updatedAliments = await getAlimentsFromFirestore(userId);
      setAliments(updatedAliments);
    } catch (error) {
      console.error("Error adding aliment:", error);
    }
  };

  const updateAliment = async (updatedAliment) => {
    try {
      await updateAlimentInFirestore(userId, updatedAliment.id, updatedAliment);
      const updatedAliments = await getAlimentsFromFirestore(userId);
      setAliments(updatedAliments);
    } catch (error) {
      console.error("Error updating aliment:", error);
    }
  };

  const deleteAliment = async (id) => {
    try {
      await deleteAlimentFromFirestore(userId, id);
      const updatedAliments = await getAlimentsFromFirestore(userId);
      setAliments(updatedAliments);
    } catch (error) {
      console.error("Error deleting aliment:", error);
    }
  };

  const decrementAlimentQuantity = async (id) => {
    const aliment = aliments.find((aliment) => aliment.id === id);
    if (aliment && aliment.quantity > 0) {
      const updatedAliment = {
        ...aliment,
        quantity: Math.max(aliment.quantity - 1, 0),
      };
      await updateAliment(updatedAliment);
    }
  };

  const incrementAlimentQuantity = async (id) => {
    const aliment = aliments.find((aliment) => aliment.id === id);
    if (aliment) {
      const updatedAliment = {
        ...aliment,
        quantity: aliment.quantity + 1,
      };
      await updateAliment(updatedAliment);
    }
  };

  const updateMultipleAliments = async (updatedAliments) => {
    const updated = aliments.map((aliment) => {
      const match = updatedAliments.find((item) => item.id === aliment.id);
      return match ? { ...aliment, type: match.type } : aliment;
    });
    setAliments(updated);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <AlimentContext.Provider
      value={{
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
      }}
    >
      {children}
    </AlimentContext.Provider>
  );
};
