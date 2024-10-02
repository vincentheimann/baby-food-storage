// /src/App.js
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { AlimentsAndTraysProvider } from "./context/AlimentsAndTraysContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage"; // Import NotFoundPage
import ProtectedRoute from "./components/ProtectedRoute";
import TopBar from "./components/TopBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <AlimentsAndTraysProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <TopBar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AlimentsAndTraysProvider>
    </AuthProvider>
  );
};

export default App;
