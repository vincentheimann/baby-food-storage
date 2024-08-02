// Dashboard.js
import React from "react";
import BacCard from "../components/BacCard";
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

const Dashboard = () => {
  const filterAlimentsByType = (type) => {
    return initialAliments.filter((aliment) => aliment.type === type);
  };

  const alimentsProchesDePeremption = initialAliments.filter((aliment) => {
    const today = new Date();
    const peremptionDate = new Date(aliment.datePeremption);
    const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 7; // Aliments dont la date de péremption est dans 7 jours ou moins
  });

  return (
    <div>
      <h1>Tableau de bord</h1>
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
        <h2>Aliments à consommer en priorité</h2>
        <AlimentList aliments={alimentsProchesDePeremption} />
      </div>
    </div>
  );
};

export default Dashboard;
