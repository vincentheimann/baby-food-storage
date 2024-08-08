// src/pages/SignUpPage.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const SignUpPage = ({ onSignUp }) => {
  const [values, setValues] = useState({
    nom: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!values.nom) validationErrors.nom = "Le nom est requis";
    if (!values.email) validationErrors.email = "L'email est requis";
    if (!values.password)
      validationErrors.password = "Le mot de passe est requis";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSignUp(values);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Créer un compte
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            error={!!errors.nom}
            label="Nom"
            name="nom"
            value={values.nom}
            onChange={handleChange}
            fullWidth
            helperText={errors.nom}
            margin="normal"
          />
          <TextField
            error={!!errors.email}
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            helperText={errors.email}
            margin="normal"
          />
          <TextField
            error={!!errors.password}
            label="Mot de passe"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            helperText={errors.password}
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              S'inscrire
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
