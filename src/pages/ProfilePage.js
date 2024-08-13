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
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
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
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const validate = () => {
    const newErrors = {
      name: values.name === "",
      email: values.email === "",
      password: values.password === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      updateUser(values);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 8 }}>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProfilePage;
