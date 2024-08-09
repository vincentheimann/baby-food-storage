import React, { useState, useEffect } from "react";
import { getNotifications } from "../services/notificationService";
import AlimentList from "../components/AlimentList";

const initialAliments = [
  {
    id: 1,
    name: "Chicken",
    freezingDate: "2024-07-01",
    expirationDate: "2024-08-01",
    type: "Proteins",
  },
  {
    id: 2,
    name: "Carrots",
    freezingDate: "2024-07-05",
    expirationDate: "2024-08-05",
    type: "Vegetables",
  },
  {
    id: 3,
    name: "Pasta",
    freezingDate: "2024-07-10",
    expirationDate: "2024-08-10",
    type: "Carbs",
  },
  {
    id: 4,
    name: "Apples",
    freezingDate: "2024-07-15",
    expirationDate: "2024-08-15",
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
