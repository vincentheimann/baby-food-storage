// src/context/AlimentContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { differenceInDays } from "date-fns";
import { useUser } from "./UserContext";

export const AlimentContext = createContext();

export const AlimentProvider = ({ children }) => {
  const { user } = useUser();
  const [aliments, setAliments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user && user.email === "demo@example.com") {
      setAliments([
        {
          id: 1,
          nom: "Poulet",
          dateCongelation: "2024-07-01",
          datePeremption: "2024-08-01",
          type: "Proteins",
          quantite: 10,
        },
        {
          id: 2,
          nom: "Carottes",
          dateCongelation: "2024-07-05",
          datePeremption: "2024-08-05",
          type: "Vegetables",
          quantite: 8,
        },
      ]);
    } else {
      setAliments([]);
    }
  }, [user]);

  useEffect(() => {
    const today = new Date();
    const updatedNotifications = aliments
      .filter((aliment) => {
        const peremptionDate = new Date(aliment.datePeremption);
        const diffDays = differenceInDays(peremptionDate, today);
        return diffDays <= 10 || diffDays < 0;
      })
      .map((aliment) => {
        const peremptionDate = new Date(aliment.datePeremption);
        const diffDays = differenceInDays(peremptionDate, today);
        let color = "green";
        let message = "";

        if (diffDays < 0) {
          color = "red";
          message = `Expiré depuis ${Math.abs(diffDays)} jour${
            Math.abs(diffDays) !== 1 ? "s" : ""
          }`;
        } else if (diffDays === 0) {
          color = "orange";
          message = "Péremption aujourd'hui";
        } else if (diffDays <= 3) {
          color = "orange";
          message = `Expire dans ${diffDays} jour${diffDays !== 1 ? "s" : ""}`;
        } else {
          message = `Expire dans ${diffDays} jour${diffDays !== 1 ? "s" : ""}`;
        }

        return { ...aliment, color, message };
      });
    setNotifications(updatedNotifications);
  }, [aliments]);

  const addAliment = (newAliment) => {
    setAliments([...aliments, { ...newAliment, id: aliments.length + 1 }]);
  };

  const decrementAlimentQuantity = (id) => {
    setAliments(
      aliments
        .map((aliment) =>
          aliment.id === id
            ? { ...aliment, quantite: aliment.quantite - 1 }
            : aliment
        )
        .filter((aliment) => aliment.quantite > 0)
    );
  };

  const incrementAlimentQuantity = (id) => {
    setAliments(
      aliments.map((aliment) =>
        aliment.id === id
          ? { ...aliment, quantite: aliment.quantite + 1 }
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

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, lue: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.lue
  ).length;

  return (
    <AlimentContext.Provider
      value={{
        aliments,
        addAliment,
        decrementAlimentQuantity,
        incrementAlimentQuantity,
        updateAliment,
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
