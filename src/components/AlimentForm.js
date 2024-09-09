import React, { useState, useContext } from "react";
import { TextField, Button, Grid, MenuItem, Typography } from "@mui/material";
import { BacContext } from "../contexts/BacContext";
import { AlimentContext } from "../contexts/AlimentContext";

const AlimentForm = () => {
  const { bacs } = useContext(BacContext);
  const { addAliment, error } = useContext(AlimentContext); // Add error handling

  const [values, setValues] = useState({
    name: "",
    freezingDate: "",
    expirationDate: "",
    type: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "quantity") {
      const quantityValue = Number(value);
      if (quantityValue >= 1) {
        setValues({
          ...values,
          [name]: quantityValue,
        });
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    // Validate inputs
    if (!values.name) validationErrors.name = "The food name is required";
    if (!values.freezingDate)
      validationErrors.freezingDate = "The freezing date is required";
    if (!values.expirationDate)
      validationErrors.expirationDate = "The expiration date is required";
    if (!values.type) validationErrors.type = "The type is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      addAliment(values); // Save aliment in Firestore
      setValues({
        name: "",
        freezingDate: "",
        expirationDate: "",
        type: "",
        quantity: 1,
      });
    }
  };

  const uniqueTypes = [...new Set(bacs.map((bac) => bac.type))];

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            error={!!errors.name}
            label="Food Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            error={!!errors.freezingDate}
            label="Freezing Date"
            name="freezingDate"
            type="date"
            value={values.freezingDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.freezingDate}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            error={!!errors.expirationDate}
            label="Expiration Date"
            name="expirationDate"
            type="date"
            value={values.expirationDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.expirationDate}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            error={!!errors.type}
            label="Type"
            name="type"
            select
            value={values.type}
            onChange={handleChange}
            fullWidth
            helperText={errors.type}
          >
            {uniqueTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Number of Ice Cubes"
            name="quantity"
            type="number"
            value={values.quantity}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlimentForm;
