// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Home from "./pages/Home";
import AddFood from "./pages/AddFood";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import TopBar from "./components/TopBar";

const App = () => {
  const initialAliments = [
    {
      id: 1,
      nom: "Poulet",
      dateCongelation: "2024-07-01",
      datePeremption: "2024-08-01",
      type: "Proteins",
    },
    {
      id: 2,
      nom: "Carottes",
      dateCongelation: "2024-07-05",
      datePeremption: "2024-08-05",
      type: "Vegetables",
    },
  ];

  const notifications = initialAliments.filter((aliment) => {
    const today = new Date();
    const peremptionDate = new Date(aliment.datePeremption);
    const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <TopBar notifications={notifications} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
