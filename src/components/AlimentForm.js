// src/components/AlimentForm.js
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AlimentForm = ({ onSubmit }) => {
  const [nom, setNom] = useState("");
  const [dateCongelation, setDateCongelation] = useState("");
  const [datePeremption, setDatePeremption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, dateCongelation, datePeremption });
    setNom("");
    setDateCongelation("");
    setDatePeremption("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nom de l'aliment"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <TextField
        label="Date de congélation"
        type="date"
        value={dateCongelation}
        onChange={(e) => setDateCongelation(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Date de péremption"
        type="date"
        value={datePeremption}
        onChange={(e) => setDatePeremption(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Ajouter
      </Button>
    </form>
  );
};

export default AlimentForm;
