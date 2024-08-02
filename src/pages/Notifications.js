// src/pages/Notifications.js
import React, { useState, useEffect } from "react";
import { getNotifications } from "../services/notificationService";
import AlimentList from "../components/AlimentList";

const initialAliments = [
  {
    id: 1,
    nom: "Poulet",
    dateCongelation: "2024-07-01",
    datePeremption: "2024-08-01",
    type: "Proteins",
  },
  {
    id: 2,
    nom: "Carottes",
    dateCongelation: "2024-07-05",
    datePeremption: "2024-08-05",
    type: "Vegetables",
  },
  {
    id: 3,
    nom: "Pâtes",
    dateCongelation: "2024-07-10",
    datePeremption: "2024-08-10",
    type: "Carbs",
  },
  {
    id: 4,
    nom: "Pommes",
    dateCongelation: "2024-07-15",
    datePeremption: "2024-08-15",
    type: "Others",
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
        <p>Aucune notification pour le moment.</p>
      )}
    </div>
  );
};

export default Notifications;
