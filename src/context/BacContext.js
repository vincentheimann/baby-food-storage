// src/context/BacContext.js
import React, { createContext, useState } from "react";

export const BacContext = createContext();

export const BacProvider = ({ children }) => {
  const [bacs, setBacs] = useState([
    { id: 1, color: "blue", type: "Proteins", capacity: 12 },
    { id: 2, color: "green", type: "Vegetables", capacity: 12 },
    { id: 3, color: "red", type: "Carbs", capacity: 12 },
    { id: 4, color: "pink", type: "Others", capacity: 12 },
  ]);

  const updateBac = (id, updatedBac) => {
    setBacs(
      bacs.map((bac) => (bac.id === id ? { ...bac, ...updatedBac } : bac))
    );
  };

  const addBac = (newBac) => {
    setBacs([...bacs, { ...newBac, id: bacs.length + 1 }]);
  };

  const removeBac = (id) => {
    setBacs(bacs.filter((bac) => bac.id !== id));
  };

  return (
    <BacContext.Provider value={{ bacs, updateBac, addBac, removeBac }}>
      {children}
    </BacContext.Provider>
  );
};
