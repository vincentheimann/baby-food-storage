// /src/components/EditTrayModal.js
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";

const EditTrayModal = ({ tray, onClose }) => {
  const { currentUser } = useAuth();
  const [trayName, setTrayName] = useState(tray.name);
  const [trayCapacity, setTrayCapacity] = useState(tray.capacity);
  const [trayColor, setTrayColor] = useState(tray.color || "#ffffff"); // Default to white if no color is set

  const handleUpdateTray = async () => {
    try {
      const trayDocRef = doc(db, `users/${currentUser.uid}/trays`, tray.id);
      await updateDoc(trayDocRef, {
        name: trayName,
        capacity: trayCapacity,
        color: trayColor,
      });
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating tray:", error);
    }
  };

  return (
    <div className="modal">
      <h2>Edit Tray</h2>
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

      {/* Color Picker */}
      <input
        type="color"
        value={trayColor}
        onChange={(e) => setTrayColor(e.target.value)}
      />

      <button onClick={handleUpdateTray}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditTrayModal;
