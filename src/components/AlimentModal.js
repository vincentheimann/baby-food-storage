import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

const AlimentModal = ({ open, handleClose, aliment, handleSave }) => {
  const [updatedAliment, setUpdatedAliment] = useState({ ...aliment });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUpdatedAliment({ ...aliment });
  }, [aliment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAliment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    const validationErrors = {};
    if (!updatedAliment.nom)
      validationErrors.nom = "Le nom de l'aliment est requis";
    if (!updatedAliment.dateCongelation)
      validationErrors.dateCongelation = "La date de congélation est requise";
    if (!updatedAliment.datePeremption)
      validationErrors.datePeremption = "La date de péremption est requise";
    if (!updatedAliment.type) validationErrors.type = "Le type est requis";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      handleSave({
        ...updatedAliment,
        quantite: Number(updatedAliment.quantite),
      });
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 1,
          maxWidth: 500,
          mx: "auto",
          mt: 10,
        }}
      >
        <Typography variant="h6" component="h2">
          Modifier l'aliment
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <TextField
              error={!!errors.nom}
              label="Nom de l'aliment"
              name="nom"
              value={updatedAliment.nom}
              onChange={handleChange}
              fullWidth
              helperText={errors.nom}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.dateCongelation}
              label="Date de congélation"
              type="date"
              name="dateCongelation"
              value={updatedAliment.dateCongelation}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              helperText={errors.dateCongelation}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.datePeremption}
              label="Date de péremption"
              type="date"
              name="datePeremption"
              value={updatedAliment.datePeremption}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              helperText={errors.datePeremption}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.type}>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                name="type"
                value={updatedAliment.type}
                onChange={handleChange}
              >
                <MenuItem value="Proteins">Protéines</MenuItem>
                <MenuItem value="Vegetables">Légumes</MenuItem>
                <MenuItem value="Carbs">Féculents</MenuItem>
                <MenuItem value="Fruits">Fruits</MenuItem>
              </Select>
              <FormHelperText>{errors.type}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nombre de glaçons"
              type="number"
              name="quantite"
              value={updatedAliment.quantite}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
            Annuler
          </Button>
          <Button onClick={handleSaveClick} variant="contained" color="primary">
            Sauvegarder
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AlimentModal;
