// src/pages/ResetPasswordPage.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { resetPassword } from "../services/authService";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await resetPassword(email);
      setMessage("Un email de réinitialisation de mot de passe a été envoyé.");
    } catch (error) {
      setMessage("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Réinitialiser le mot de passe
        </Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Réinitialiser
          </Button>
        </form>
        {message && (
          <Box mt={2}>
            <Typography>{message}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
