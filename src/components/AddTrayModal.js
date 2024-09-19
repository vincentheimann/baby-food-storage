// /src/components/AddTrayModal.js
import React, { useState } from "react";
import { addTray } from "../services/trayService";
import { useAuth } from "../context/AuthContext";

const AddTrayModal = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [trayName, setTrayName] = useState("");
  const [trayCapacity, setTrayCapacity] = useState(12); // Default capacity
  const [trayColor, setTrayColor] = useState("#ffffff"); // Default color

  const handleAddTray = async () => {
    if (trayName.trim()) {
      try {
        await addTray(currentUser.uid, {
          name: trayName,
          capacity: trayCapacity,
          color: trayColor,
          used: 0,
        });
        onClose(); // Close the modal after successful add
      } catch (error) {
        console.error("Error adding tray:", error);
      }
    }
  };

  return (
    <div>
      <h2>Add New Tray</h2>
      <input
        type="text"
        placeholder="Tray Name"
        value={trayName}
        onChange={(e) => setTrayName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Capacity"
        value={trayCapacity}
        onChange={(e) => setTrayCapacity(e.target.value)}
      />
      <input
        type="color"
        value={trayColor}
        onChange={(e) => setTrayColor(e.target.value)}
      />
      <button onClick={handleAddTray}>Add Tray</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddTrayModal;
