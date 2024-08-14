import React, { createContext, useState } from "react";

const generateNewId = (bacs) => bacs.length + 1;

export const BacContext = createContext();

export const BacProvider = ({ children }) => {
  const [bacs, setBacs] = useState([
    { id: 1, color: "blue", type: "Proteins", capacity: 12 },
    { id: 2, color: "green", type: "Vegetables", capacity: 12 },
    { id: 3, color: "red", type: "Carbs", capacity: 12 },
    { id: 4, color: "pink", type: "Fruits", capacity: 12 },
  ]);

  const updateBac = (id, updatedBac) => {
    if (updatedBac.capacity < 1) {
      updatedBac.capacity = 1;
    }
    setBacs(
      bacs.map((bac) => (bac.id === id ? { ...bac, ...updatedBac } : bac))
    );
  };

  const addBac = (newBac) => {
    if (newBac.capacity < 1) {
      newBac.capacity = 1;
    }
    setBacs([...bacs, { ...newBac, id: generateNewId(bacs) }]);
  };

  const removeBac = (type) => {
    setBacs(bacs.filter((bac) => bac.type !== type));
  };

  return (
    <BacContext.Provider value={{ bacs, updateBac, addBac, removeBac }}>
      {children}
    </BacContext.Provider>
  );
};
