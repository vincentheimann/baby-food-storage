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
import { BacProvider } from "./contexts/BacContext";
import { AlimentProvider } from "./contexts/AlimentContext";
import { UserProvider, useUser } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PageNotFound from "./pages/PageNotFound";

const AppContent = () => {
  const { isAuthenticated, user } = useUser(); // Get userId from user context

  return (
    <>
      {isAuthenticated && <TopBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {isAuthenticated ? (
          <Route path="*" element={<ProtectedRoutes userId={user?.uid} />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
};

const ProtectedRoutes = ({ userId }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/notifications" element={<Notifications />} />
    <Route path="/config-bacs" element={<BacConfig userId={userId} />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <UserProvider>
          <BacProvider userId={useUser()?.user?.uid}>
            <AlimentProvider userId={useUser()?.user?.uid}>
              <AppContent />
            </AlimentProvider>
          </BacProvider>
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
