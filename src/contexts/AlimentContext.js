import React, { createContext, useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import { useUser } from "./UserContext";

export const AlimentContext = createContext();

export const AlimentProvider = ({ children, userId }) => {
  const [aliments, setAliments] = useState([]);
  const { user } = useUser();

  const [notifications, setNotifications] = useState([]);

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

  const addAliment = (newAliment) => {
    if (newAliment.quantity < 0) {
      alert("Quantity cannot be negative.");
      return;
    }
    setAliments([...aliments, { ...newAliment, id: aliments.length + 1 }]);
  };

  const decrementAlimentQuantity = (id) => {
    setAliments(
      aliments.map((aliment) =>
        aliment.id === id && aliment.quantity > 0
          ? { ...aliment, quantity: Math.max(aliment.quantity - 1, 0) }
          : aliment
      )
    );
  };

  const incrementAlimentQuantity = (id) => {
    setAliments(
      aliments.map((aliment) =>
        aliment.id === id
          ? { ...aliment, quantity: aliment.quantity + 1 }
          : aliment
      )
    );
  };

  const updateAliment = (updatedAliment) => {
    setAliments(
      aliments.map((aliment) =>
        aliment.id === updatedAliment.id ? updatedAliment : aliment
      )
    );
  };

  const updateMultipleAliments = (updatedAliments) => {
    setAliments(
      aliments.map((aliment) => {
        const updated = updatedAliments.find((item) => item.id === aliment.id);
        return updated ? { ...aliment, type: updated.type } : aliment;
      })
    );
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

export default AlimentContext;
