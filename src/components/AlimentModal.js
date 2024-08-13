import React, { useState, useEffect, useContext } from "react";
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
import { BacContext } from "../context/BacContext";

const AlimentModal = ({ open, handleClose, aliment, handleSave }) => {
  const { bacs } = useContext(BacContext); // Access types from BacContext
  const [updatedAliment, setUpdatedAliment] = useState({ ...aliment });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUpdatedAliment({ ...aliment });
  }, [aliment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && value < 1) {
      setUpdatedAliment((prev) => ({
        ...prev,
        [name]: 1, // or you could just prevent setting a negative value
      }));
    } else {
      setUpdatedAliment((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveClick = () => {
    const validationErrors = {};
    if (!updatedAliment.name) validationErrors.name = "Food name is required";
    if (!updatedAliment.freezingDate)
      validationErrors.freezingDate = "Freezing date is required";
    if (!updatedAliment.expirationDate)
      validationErrors.expirationDate = "Expiration date is required";
    if (!updatedAliment.type) validationErrors.type = "Type is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      handleSave({
        ...updatedAliment,
        quantity: Number(updatedAliment.quantity),
      });
      handleClose();
    }
  };

  const uniqueTypes = [...new Set(bacs.map((bac) => bac.type))]; // Get unique types

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
          Edit Food Item
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <TextField
              error={!!errors.name}
              label="Food name"
              name="name"
              value={updatedAliment.name}
              onChange={handleChange}
              fullWidth
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.freezingDate}
              label="Freezing date"
              type="date"
              name="freezingDate"
              value={updatedAliment.freezingDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              helperText={errors.freezingDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.expirationDate}
              label="Expiration date"
              type="date"
              name="expirationDate"
              value={updatedAliment.expirationDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              helperText={errors.expirationDate}
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
                {uniqueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.type}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of ice cubes"
              type="number"
              name="quantity"
              value={updatedAliment.quantity}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleSaveClick} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AlimentModal;
