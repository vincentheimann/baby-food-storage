// src/pages/SignUpPage.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ onSignUp }) => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!values.name) validationErrors.name = "Name required";
    if (!values.email) validationErrors.email = "Email is required";
    if (!values.password) validationErrors.password = "Password required";
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSignUp(values);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create an account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            error={!!errors.name}
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            fullWidth
            helperText={errors.name}
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
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            helperText={errors.password}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign up
          </Button>
          <Button
            onClick={() => navigate("/login")}
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Back to login page
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
