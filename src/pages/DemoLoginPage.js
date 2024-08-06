// src/pages/DemoLoginPage.js
import React, { useContext } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const DemoLoginPage = () => {
  const { loginDemoUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDemoLogin = () => {
    loginDemoUser();
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Compte de Démonstration
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDemoLogin}
          size="large"
        >
          Connexion en tant que Démonstration
        </Button>
      </Box>
    </Container>
  );
};

export default DemoLoginPage;
