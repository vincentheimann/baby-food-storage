import React, { createContext, useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import { useUser } from "./UserContext";

export const AlimentContext = createContext();

export const AlimentProvider = ({ children }) => {
  const [aliments, setAliments] = useState([]);
  const { user } = useUser();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user && user.email === "demo@example.com") {
      setAliments([
        {
          id: 1,
          name: "Chicken",
          freezingDate: "2024-07-01",
          expirationDate: "2024-08-01",
          type: "Proteins",
          quantity: 10,
        },
        {
          id: 2,
          name: "Carrots",
          freezingDate: "2024-07-05",
          expirationDate: "2024-08-05",
          type: "Vegetables",
          quantity: 8,
        },
        {
          id: 3,
          name: "Pasta",
          freezingDate: "2024-07-10",
          expirationDate: "2024-08-10",
          type: "Carbs",
          quantity: 15,
        },
        {
          id: 4,
          name: "Apples",
          freezingDate: "2024-07-15",
          expirationDate: "2024-08-15",
          type: "Fruits",
          quantity: 5,
        },
        {
          id: 5,
          name: "Salmon",
          freezingDate: "2024-07-20",
          expirationDate: "2024-08-20",
          type: "Proteins",
          quantity: 12,
        },
        {
          id: 6,
          name: "Broccoli",
          freezingDate: "2024-07-25",
          expirationDate: "2024-08-25",
          type: "Vegetables",
          quantity: 9,
        },
        {
          id: 7,
          name: "Rice",
          freezingDate: "2024-07-30",
          expirationDate: "2024-08-30",
          type: "Carbs",
          quantity: 20,
        },
        {
          id: 8,
          name: "Strawberries",
          freezingDate: "2024-07-05",
          expirationDate: "2024-08-05",
          type: "Fruits",
          quantity: 6,
        },
        {
          id: 9,
          name: "Beef",
          freezingDate: "2024-07-10",
          expirationDate: "2024-08-10",
          type: "Proteins",
          quantity: 10,
        },
        {
          id: 10,
          name: "Spinach",
          freezingDate: "2024-07-15",
          expirationDate: "2024-08-15",
          type: "Vegetables",
          quantity: 7,
        },
        // Add more food items for the demo user...
      ]);
    } else {
      setAliments([]);
    }
  }, [user]);

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
    setAliments([...aliments, { ...newAliment, id: aliments.length + 1 }]);
  };

  const decrementAlimentQuantity = (id) => {
    setAliments(
      aliments
        .map((aliment) =>
          aliment.id === id
            ? { ...aliment, quantity: aliment.quantity - 1 }
            : aliment
        )
        .filter((aliment) => aliment.quantity > 0)
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

  // New function to handle bulk updates
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
        updateMultipleAliments, // Add this to the context
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
