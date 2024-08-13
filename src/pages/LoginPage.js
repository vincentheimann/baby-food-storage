import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUser } from "../context/UserContext";

const theme = createTheme();

const LoginPage = () => {
  const { login, demoLogin } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({ email: false, password: false });
  const [generalError, setGeneralError] = React.useState("");

  useEffect(() => {
    if (generalError) {
      // Handle side-effects like logging errors, etc.
    }
  }, [generalError]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailError = !email;
    const passwordError = !password;

    if (emailError || passwordError) {
      setError({ email: emailError, password: passwordError });
      return; // Ensure form submission is halted if there are validation errors
    }

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setGeneralError("Login failed. Please check your credentials.");
    }
  };

  const handleDemoLogin = async () => {
    try {
      await demoLogin();
      navigate("/");
    } catch (error) {
      setGeneralError("Demo login failed. Please try again.");
    }
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/static/images/templates/sign-in-side.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError((prevState) => ({ ...prevState, email: false }));
                }}
                error={error.email}
                helperText={error.email ? "Email is required" : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError((prevState) => ({ ...prevState, password: false }));
                }}
                error={error.password}
                helperText={error.password ? "Password is required" : ""}
              />
              {generalError && (
                <Typography color="error" variant="body2">
                  {generalError}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-testid="login-button"
              >
                Sign In
              </Button>
              <Button
                onClick={handleDemoLogin}
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
                data-testid="demo-login-button"
              >
                Demo account login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/reset-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
