// src/pages/Home.js
import React, { useState } from "react";
import BacCard from "../components/BacCard";
import AlimentList from "../components/AlimentList";
import AlimentForm from "../components/AlimentForm";

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
];

const Home = () => {
  const [aliments, setAliments] = useState(initialAliments);

  const handleAddAliment = (newAliment) => {
    setAliments([...aliments, { ...newAliment, id: aliments.length + 1 }]);
  };

  const filterAlimentsByType = (type) => {
    return aliments.filter((aliment) => aliment.type === type);
  };

  return (
    <div>
      <h1>Accueil</h1>
      <div>
        <BacCard
          color="blue"
          type="Proteins"
          aliments={filterAlimentsByType("Proteins")}
        />
        <BacCard
          color="green"
          type="Vegetables"
          aliments={filterAlimentsByType("Vegetables")}
        />
        <BacCard
          color="red"
          type="Carbs"
          aliments={filterAlimentsByType("Carbs")}
        />
        <BacCard
          color="pink"
          type="Others"
          aliments={filterAlimentsByType("Others")}
        />
      </div>
      <div>
        <h2>Ajouter un aliment</h2>
        <AlimentForm onSubmit={handleAddAliment} />
      </div>
      <div>
        <h2>Liste des aliments</h2>
        <AlimentList aliments={aliments} />
      </div>
    </div>
  );
};

export default Home;
