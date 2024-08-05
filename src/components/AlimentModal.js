// src/components/AlimentModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";

const AlimentModal = ({ open, handleClose, aliment, handleSave }) => {
  const [updatedAliment, setUpdatedAliment] = useState({ ...aliment });

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
    handleSave(updatedAliment);
    handleClose();
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
              label="Nom de l'aliment"
              name="nom"
              value={updatedAliment.nom}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date de congélation"
              type="date"
              name="dateCongelation"
              value={updatedAliment.dateCongelation}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date de péremption"
              type="date"
              name="datePeremption"
              value={updatedAliment.datePeremption}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Type"
              name="type"
              value={updatedAliment.type}
              onChange={handleChange}
              fullWidth
            />
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
