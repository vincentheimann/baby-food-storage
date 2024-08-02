// AddFood.js
import React from "react";
import AlimentForm from "../components/AlimentForm";

const AddFood = () => {
  const handleAddAliment = (newAliment) => {
    console.log("Aliment ajouté:", newAliment);
  };

  return (
    <div>
      <h1>Ajouter un aliment</h1>
      <AlimentForm onSubmit={handleAddAliment} />
    </div>
  );
};

export default AddFood;
