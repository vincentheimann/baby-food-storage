import React, { useState, useEffect } from "react";
import { getNotifications } from "../services/notificationService";
import AlimentList from "../components/AlimentList";

const initialAliments = [
  {
    id: 1,
    nom: "Chicken",
    dateCongelation: "2024-07-01",
    datePeremption: "2024-08-01",
    type: "Proteins",
  },
  {
    id: 2,
    nom: "Carrots",
    dateCongelation: "2024-07-05",
    datePeremption: "2024-08-05",
    type: "Vegetables",
  },
  {
    id: 3,
    nom: "Pasta",
    dateCongelation: "2024-07-10",
    datePeremption: "2024-08-10",
    type: "Carbs",
  },
  {
    id: 4,
    nom: "Apples",
    dateCongelation: "2024-07-15",
    datePeremption: "2024-08-15",
    type: "Fruits",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notifs = getNotifications(initialAliments);
    setNotifications(notifs);
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length > 0 ? (
        <AlimentList aliments={notifications} />
      ) : (
        <p>No notifications at the moment.</p>
      )}
    </div>
  );
};

export default Notifications;
