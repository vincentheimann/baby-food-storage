import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { AlimentContext } from "../contexts/AlimentContext";
import { useUser } from "../contexts/UserContext";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    notifications,
    markNotificationAsRead,
    deleteNotification,
    unreadNotificationsCount,
  } = useContext(AlimentContext);
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
    handleProfileMenuClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
          data-testid="menu-button"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Baby Food Storage
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            onClick={() => handleNavigation("/config-bacs")}
            data-testid="settings-button"
          >
            <SettingsIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={toggleDrawer(true)}
            data-testid="notifications-button"
          >
            <Badge badgeContent={unreadNotificationsCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box
            onMouseEnter={handleProfileMenuOpen}
            onMouseLeave={handleProfileMenuClose}
          >
            <IconButton edge="end" color="inherit" data-testid="profile-button">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchorEl}
              open={Boolean(profileMenuAnchorEl)}
              onClose={handleProfileMenuClose}
              MenuListProps={{ onMouseLeave: handleProfileMenuClose }}
            >
              <MenuItem onClick={() => handleNavigation("/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigation("/")}>Home</MenuItem>
          <MenuItem onClick={() => handleNavigation("/dashboard")}>
            Dashboard
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
                    primary={notification.name}
                    secondary={notification.message}
                    style={{
                      textDecoration: notification.read
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
                <ListItemText primary="No notifications" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
