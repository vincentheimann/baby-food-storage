import React, { useContext } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const DemoLoginPage = () => {
  const { demoLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    await demoLogin();
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Demo Account
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDemoLogin}
          size="large"
        >
          Login as Demo
        </Button>
      </Box>
    </Container>
  );
};

export default DemoLoginPage;
