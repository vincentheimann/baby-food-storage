// /src/pages/LoginPage.js
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Correct import for Grid2

const LoginPage = () => {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/"); // Redirect to HomePage if the user is logged in
    }
  }, [currentUser, navigate]);

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" align="center">
          Login
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={login}>
          Sign in with Google
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
