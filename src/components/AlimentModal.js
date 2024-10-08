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
import { BacContext } from "../contexts/BacContext";
import { AlimentContext } from "../contexts/AlimentContext";

const AlimentModal = ({ open, handleClose, aliment, handleSave }) => {
  const { bacs } = useContext(BacContext); // Access bac types from BacContext
  const { updateAliment } = useContext(AlimentContext); // Firestore update

  const [updatedAliment, setUpdatedAliment] = useState({ ...aliment });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (aliment) {
      setUpdatedAliment({ ...aliment });
    }
  }, [aliment]);

  // Real-time validation for each input field
  const validate = (field, value) => {
    let validationErrors = {};

    if (field === "name" && !value) {
      validationErrors.name = "Food name is required";
    }
    if (field === "freezingDate" && !value) {
      validationErrors.freezingDate = "Freezing date is required";
    }
    if (field === "expirationDate" && !value) {
      validationErrors.expirationDate = "Expiration date is required";
    }
    if (field === "type" && !value) {
      validationErrors.type = "Type is required";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAliment((prev) => ({ ...prev, [name]: value }));

    // Trigger real-time validation
    validate(name, value);
  };

  const handleSaveClick = () => {
    const validationErrors = {};

    // Run validation on all fields before saving
    if (!updatedAliment.name) validationErrors.name = "Food name is required";
    if (!updatedAliment.freezingDate)
      validationErrors.freezingDate = "Freezing date is required";
    if (!updatedAliment.expirationDate)
      validationErrors.expirationDate = "Expiration date is required";
    if (!updatedAliment.type) validationErrors.type = "Type is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      updateAliment(updatedAliment); // Update aliment in Firestore
      handleClose(); // Close the modal
    }
  };

  const uniqueTypes = [...new Set(bacs.map((bac) => bac.type))]; // Get unique types

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: { xs: 3, sm: 4 },
          bgcolor: "background.paper",
          borderRadius: 1,
          maxWidth: 500,
          mx: "auto",
          mt: { xs: 8, sm: 10 },
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
              autoFocus // Automatically focus on the food name input
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!errors.freezingDate}
              label="Freezing date"
              type="date"
              name="freezingDate"
              value={updatedAliment.freezingDate || ""}
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
              value={updatedAliment.expirationDate || ""}
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
                value={updatedAliment.type || ""}
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
              inputProps={{ min: 1 }}
            />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleSaveClick} variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AlimentModal;
