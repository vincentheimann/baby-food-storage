// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f5f5f5",
    },
    text: {
      primary: "#333333",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.75rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
