// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import BacConfig from "./pages/BacConfig";
import ProfilePage from "./pages/ProfilePage";
import TopBar from "./components/TopBar";
import { BacProvider } from "./context/BacContext";
import { AlimentProvider } from "./context/AlimentContext";
import { UserProvider, useUser } from "./context/UserContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  const { isAuthenticated } = useUser();

  return (
    <>
      {isAuthenticated && <TopBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
};

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/notifications" element={<Notifications />} />
    <Route path="/config-bacs" element={<BacConfig />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BacProvider>
          <AlimentProvider>
            <Router>
              <AppContent />
            </Router>
          </AlimentProvider>
        </BacProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
