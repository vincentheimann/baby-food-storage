import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const SignUpPage = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signUp: handleSignUp } = useUser();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!values.firstName) validationErrors.firstName = "First name required";
    if (!values.lastName) validationErrors.lastName = "Last name required";
    if (!values.email) validationErrors.email = "Email is required";
    if (!values.password) validationErrors.password = "Password required";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await handleSignUp(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        );
        navigate("/");
      } catch (error) {
        console.error("Error during sign-up:", error);
        // Handle error feedback here
      }
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
            error={!!errors.firstName}
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            fullWidth
            helperText={errors.firstName}
            margin="normal"
          />
          <TextField
            error={!!errors.lastName}
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            fullWidth
            helperText={errors.lastName}
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
