// src/components/AlimentForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const AlimentForm = ({ onSubmit }) => {
  const [nom, setNom] = useState('');
  const [dateCongelation, setDateCongelation] = useState('');
  const [datePeremption, setDatePeremption] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, dateCongelation, datePeremption, type });
    setNom('');
    setDateCongelation('');
    setDatePeremption('');
    setType('');
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
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Proteins">Proteins</MenuItem>
              <MenuItem value="Vegetables">Vegetables</MenuItem>
              <MenuItem value="Carbs">Carbs</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
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
