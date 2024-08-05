// src/components/AlimentForm.js
import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";

const AlimentForm = ({ onSubmit }) => {
  const [values, setValues] = useState({
    nom: "",
    dateCongelation: "",
    datePeremption: "",
    type: "",
    quantite: 1,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: name === "quantite" ? Number(value) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!values.nom) validationErrors.nom = "Le nom de l'aliment est requis";
    if (!values.dateCongelation)
      validationErrors.dateCongelation = "La date de congélation est requise";
    if (!values.datePeremption)
      validationErrors.datePeremption = "La date de péremption est requise";
    if (!values.type) validationErrors.type = "Le type est requis";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Nom de l'aliment"
            name="nom"
            value={values.nom}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.nom}
            helperText={errors.nom}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Date de congélation"
            name="dateCongelation"
            type="date"
            value={values.dateCongelation}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.dateCongelation}
            helperText={errors.dateCongelation}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Date de péremption"
            name="datePeremption"
            type="date"
            value={values.datePeremption}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.datePeremption}
            helperText={errors.datePeremption}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Type"
            name="type"
            select
            value={values.type}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.type}
            helperText={errors.type}
          >
            <MenuItem value="Protéines">Protéines</MenuItem>
            <MenuItem value="Légumes">Légumes</MenuItem>
            <MenuItem value="Féculents">Féculents</MenuItem>
            <MenuItem value="Autres">Autres</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Nombre de glaçons"
            name="quantite"
            type="number"
            value={values.quantite}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlimentForm;
