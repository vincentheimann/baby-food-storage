// src/components/TopBar.js
import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { AlimentContext } from "../context/AlimentContext";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    notifications,
    markNotificationAsRead,
    deleteNotification,
    unreadNotificationsCount,
  } = useContext(AlimentContext);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Baby Food Storage
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => handleNavigation("/config-bacs")}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <Badge badgeContent={unreadNotificationsCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigation("/")}>Accueil</MenuItem>
          <MenuItem onClick={() => handleNavigation("/dashboard")}>
            Tableau de bord
          </MenuItem>
        </Menu>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem
                  button
                  key={notification.id}
                  onClick={() => markNotificationAsRead(notification.id)}
                  style={{ backgroundColor: notification.color }}
                >
                  <ListItemText
                    primary={notification.nom}
                    secondary={notification.message}
                    style={{
                      textDecoration: notification.lue
                        ? "line-through"
                        : "none",
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Aucune notification" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
