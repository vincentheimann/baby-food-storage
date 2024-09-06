import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
    if (!values.password) {
      validationErrors.password = "Password required";
    } else if (values.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await handleSignUp(
          values.email,
          values.password,
          values.firstName,
          values.lastName
        );
        setOpenSnackbar(true); // Show the success Snackbar

        navigate("/"); // Redirect after success
      } catch (error) {
        if (error.message.includes("email-already-in-use")) {
          setErrors({ email: "This email is already in use." });
        } else {
          console.error("Error during sign-up:", error);
        }
        setOpenSnackbar(false); // Hide Snackbar for errors
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Account created! Please check your email to verify your account.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUpPage;
