// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Home from "./pages/Home";
import AddFood from "./pages/AddFood";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
