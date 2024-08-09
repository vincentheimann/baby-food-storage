import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";

const AlimentForm = ({ onSubmit }) => {
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
    setValues({
      ...values,
      [name]: name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!values.name) validationErrors.name = "The food name is required";
    if (!values.freezingDate)
      validationErrors.freezingDate = "The freezing date is required";
    if (!values.expirationDate)
      validationErrors.expirationDate = "The expiration date is required";
    if (!values.type) validationErrors.type = "The type is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            <MenuItem value="Proteins">Proteins</MenuItem>
            <MenuItem value="Vegetables">Vegetables</MenuItem>
            <MenuItem value="Carbs">Carbs</MenuItem>
            <MenuItem value="Fruits">Fruits</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            error={!!errors.quantity}
            label="Number of Ice Cubes"
            name="quantity"
            type="number"
            value={values.quantity}
            onChange={handleChange}
            fullWidth
            helperText={errors.quantity}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlimentForm;
