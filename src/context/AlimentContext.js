// src/context/AlimentContext.js
import React, { createContext, useState } from "react";

export const AlimentContext = createContext();

export const AlimentProvider = ({ children }) => {
  const [aliments, setAliments] = useState([
    {
      id: 1,
      nom: "Poulet",
      dateCongelation: "2024-07-01",
      datePeremption: "2024-08-01",
      type: "Proteins",
      quantite: 10,
    },
    {
      id: 2,
      nom: "Carottes",
      dateCongelation: "2024-07-05",
      datePeremption: "2024-08-05",
      type: "Vegetables",
      quantite: 8,
    },
  ]);

  const addAliment = (newAliment) => {
    setAliments([...aliments, { ...newAliment, id: aliments.length + 1 }]);
  };

  const decrementAlimentQuantity = (id) => {
    setAliments(
      aliments
        .map((aliment) =>
          aliment.id === id
            ? { ...aliment, quantite: aliment.quantite - 1 }
            : aliment
        )
        .filter((aliment) => aliment.quantite > 0)
    );
  };

  const incrementAlimentQuantity = (id) => {
    setAliments(
      aliments.map((aliment) =>
        aliment.id === id
          ? { ...aliment, quantite: aliment.quantite + 1 }
          : aliment
      )
    );
  };

  const notifications = aliments.filter((aliment) => {
    const today = new Date();
    const peremptionDate = new Date(aliment.datePeremption);
    const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  return (
    <AlimentContext.Provider
      value={{
        aliments,
        addAliment,
        decrementAlimentQuantity,
        incrementAlimentQuantity,
        notifications,
      }}
    >
      {children}
    </AlimentContext.Provider>
  );
};
