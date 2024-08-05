// src/context/FoodContext.js
import React, { createContext, useState } from "react";

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [aliments, setAliments] = useState([
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
  ]);

  const addAliment = (newAliment) => {
    setAliments([...aliments, { ...newAliment, id: aliments.length + 1 }]);
  };

  const notifications = aliments.filter((aliment) => {
    const today = new Date();
    const peremptionDate = new Date(aliment.datePeremption);
    const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  return (
    <FoodContext.Provider value={{ aliments, addAliment, notifications }}>
      {children}
    </FoodContext.Provider>
  );
};
