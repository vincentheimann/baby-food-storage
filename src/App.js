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
import BacConfig from "./pages/BacConfig";
import ProfilePage from "./pages/ProfilePage";
import TopBar from "./components/TopBar";
import { BacProvider } from "./contexts/BacContext";
import { AlimentProvider } from "./contexts/AlimentContext";
import { UserProvider, useUser } from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";

const AppContent = () => {
  const { isAuthenticated, user, loading } = useUser(); // Include loading state

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while checking authentication
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <TopBar /> {/* Keep TopBar visible for authenticated users */}
          <BacProvider userId={user.uid}>
            <AlimentProvider userId={user.uid}>
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                {/* <Route path="/notifications" element={<Notifications />} /> */}
                <Route
                  path="/config-bacs"
                  element={<BacConfig userId={user.uid} />}
                />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/login"
                  element={<Navigate to="/" replace />}
                />{" "}
                {/* Redirect to home if authenticated */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </AlimentProvider>
          </BacProvider>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
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
