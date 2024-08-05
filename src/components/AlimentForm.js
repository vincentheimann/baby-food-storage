// src/components/AlimentForm.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const AlimentForm = ({ onSubmit }) => {
  const [nom, setNom] = useState("");
  const [dateCongelation, setDateCongelation] = useState("");
  const [datePeremption, setDatePeremption] = useState("");
  const [type, setType] = useState("");
  const [quantite, setQuantite] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, dateCongelation, datePeremption, type, quantite });
    setNom("");
    setDateCongelation("");
    setDatePeremption("");
    setType("");
    setQuantite(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Nom de l'aliment"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Date de congélation"
            type="date"
            value={dateCongelation}
            onChange={(e) => setDateCongelation(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Date de péremption"
            type="date"
            value={datePeremption}
            onChange={(e) => setDatePeremption(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth required>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="Proteins">Protéines</MenuItem>
              <MenuItem value="Vegetables">Légumes</MenuItem>
              <MenuItem value="Carbs">Féculents</MenuItem>
              <MenuItem value="Others">Autres</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Nombre de glaçons"
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlimentForm;
