// /src/components/AddAlimentModal.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { addAliment } from "../services/alimentService";
import { fetchTrays } from "../services/trayService";

const AddAlimentModal = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [alimentName, setAlimentName] = useState("");
  const [alimentType, setAlimentType] = useState("Protein");
  const [trays, setTrays] = useState([]);
  const [trayQuantities, setTrayQuantities] = useState({}); // Store quantity per tray

  useEffect(() => {
    const loadTrays = async () => {
      const trayData = await fetchTrays(currentUser.uid); // Fetch available trays
      setTrays(trayData);
    };
    loadTrays();
  }, [currentUser]);

  const handleAddAliment = async () => {
    const totalQuantity = Object.values(trayQuantities).reduce(
      (acc, qty) => acc + qty,
      0
    ); // Total quantity across trays

    const alimentData = {
      name: alimentName,
      type: alimentType,
      totalQuantity,
      trays: Object.keys(trayQuantities).map((trayId) => ({
        trayId,
        quantity: trayQuantities[trayId],
      })),
    };

    await addAliment(currentUser.uid, alimentData); // Add aliment to Firestore
    onClose();
  };

  const handleTrayQuantityChange = (trayId, quantity) => {
    setTrayQuantities((prev) => ({ ...prev, [trayId]: Number(quantity) })); // Update quantity for each tray
  };

  return (
    <div className="modal">
      <h2>Add New Aliment</h2>
      <input
        type="text"
        placeholder="Aliment Name"
        value={alimentName}
        onChange={(e) => setAlimentName(e.target.value)}
      />
      <select
        value={alimentType}
        onChange={(e) => setAlimentType(e.target.value)}
      >
        <option value="Protein">Protein</option>
        <option value="Carb">Carb</option>
        <option value="Vegetable">Vegetable</option>
      </select>

      {/* Display trays and allow user to specify quantity per tray */}
      {trays.map((tray) => (
        <div key={tray.id}>
          <span>
            {tray.name} (Available capacity: {tray.capacity - tray.used})
          </span>
          <input
            type="number"
            placeholder="Quantity"
            value={trayQuantities[tray.id] || 0}
            onChange={(e) => handleTrayQuantityChange(tray.id, e.target.value)}
          />
        </div>
      ))}

      <button onClick={handleAddAliment}>Add Aliment</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddAlimentModal;
