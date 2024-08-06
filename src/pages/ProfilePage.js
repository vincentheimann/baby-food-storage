// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useUser } from "../context/UserContext";

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setValues({
        name: user.displayName || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(values);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mon Profil
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom"
            name="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Mot de passe"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Mettre à jour
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProfilePage;
