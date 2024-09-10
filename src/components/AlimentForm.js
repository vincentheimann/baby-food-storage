import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import IcecreamIcon from "@mui/icons-material/Icecream";
import { BacContext } from "../contexts/BacContext";
import { AlimentContext } from "../contexts/AlimentContext";
import { addDays, format } from "date-fns";

const AlimentForm = () => {
  const { bacs } = useContext(BacContext);
  const { addAliment, error, loading } = useContext(AlimentContext);

  const getCurrentDate = () => format(new Date(), "yyyy-MM-dd");
  const getDefaultExpirationDate = () =>
    format(addDays(new Date(), 30), "yyyy-MM-dd");

  const [values, setValues] = useState({
    name: "",
    freezingDate: getCurrentDate(), // Default to current date
    expirationDate: getDefaultExpirationDate(), // Default to current date + 30 days
    type: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false); // Changed to boolean for Snackbar control

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

  const handleSubmit = async (event) => {
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
      try {
        await addAliment(values); // Save aliment in Firestore
        setSuccessMessage(true); // Trigger Snackbar
        setValues({
          name: "",
          freezingDate: getCurrentDate(), // Reset to current date
          expirationDate: getDefaultExpirationDate(), // Reset to current date + 30 days
          type: "",
          quantity: 1,
        });
      } catch (err) {
        setErrors({ form: "Failed to add aliment. Please try again." });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
  };

  const uniqueTypes = [...new Set(bacs.map((bac) => bac.type))];

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      <Snackbar
        open={successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Aliment added successfully!
        </Alert>
      </Snackbar>

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LabelIcon />
                </InputAdornment>
              ),
            }}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon />
                </InputAdornment>
              ),
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventAvailableIcon />
                </InputAdornment>
              ),
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IcecreamIcon />
                </InputAdornment>
              ),
              inputProps: { min: 1 },
            }}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </Grid>
      </Grid>
      {errors.form && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {errors.form}
        </Typography>
      )}
    </form>
  );
};

export default AlimentForm;
