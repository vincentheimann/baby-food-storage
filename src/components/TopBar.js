// /src/components/TopBar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const TopBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // For user menu (Profile, Logout)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
    handleCloseMenu();
  };

  if (!currentUser) {
    return null; // If the user is not authenticated, don't render the TopBar
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Baby Food Storage App
        </Typography>

        {/* Navigation Links */}
        <nav>
          <Button color="inherit" component={NavLink} to="/" exact>
            Home
          </Button>
          <Button color="inherit" component={NavLink} to="/trays">
            Tray Management
          </Button>
        </nav>

        {/* User Menu (Profile/Logout) */}
        <div>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
