// src/context/AlimentContext.js
import React, { createContext, useState, useEffect } from "react";

export const AlimentContext = createContext();

export const AlimentProvider = ({ children }) => {
  const [aliments, setAliments] = useState([
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

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const today = new Date();
    const updatedNotifications = aliments
      .filter((aliment) => {
        const peremptionDate = new Date(aliment.datePeremption);
        const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
        return diffDays <= 10;
      })
      .map((aliment) => {
        const peremptionDate = new Date(aliment.datePeremption);
        const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
        let color = "green";
        if (diffDays <= 3) color = "orange";
        if (diffDays < 0) color = "red";
        return { ...aliment, color };
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
