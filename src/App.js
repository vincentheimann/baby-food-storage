// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Home from "./pages/Home";
import AddFood from "./pages/AddFood";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import BacConfig from "./pages/BacConfig";
import TopBar from "./components/TopBar";
import { BacProvider } from "./context/BacContext";
import { AlimentProvider } from "./context/AlimentContext";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BacProvider>
        <AlimentProvider>
          <Router>
            <TopBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-food" element={<AddFood />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/config-bacs" element={<BacConfig />} />
            </Routes>
          </Router>
        </AlimentProvider>
      </BacProvider>
    </ThemeProvider>
  );
};

export default App;
