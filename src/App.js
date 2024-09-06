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
import VerifyEmailPage from './pages/VerifyEmailPage';
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PageNotFound from "./pages/PageNotFound";

const AppContent = () => {
  const { isAuthenticated, user } = useUser();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (!user.emailVerified) {
    return <VerifyEmailPage />;
  }

  return (
    <>
      <TopBar />
      <BacProvider userId={user.uid}>
        <AlimentProvider userId={user.uid}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/config-bacs"
              element={<BacConfig userId={user.uid} />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AlimentProvider>
      </BacProvider>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
