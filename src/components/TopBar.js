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
  Box,
  // Badge,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { AlimentContext } from "../contexts/AlimentContext";
import { useUser } from "../contexts/UserContext";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { notifications, markNotificationAsRead, deleteNotification } =
    useContext(AlimentContext);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Open/Close main navigation menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open/Close profile menu
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
    handleProfileMenuClose();
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Drawer toggle
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
        {/* Left-side Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
          data-testid="menu-button"
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Baby Food Storage
        </Typography>

        {/* Settings and Profile Actions */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Settings Button */}
          <Tooltip title="Configure Bacs">
            <IconButton
              color="inherit"
              onClick={() => handleNavigation("/config-bacs")}
              data-testid="settings-button"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* Notifications (Optional) */}
          {/* {notifications.length > 0 && (
            <IconButton
              color="inherit"
              onClick={toggleDrawer(true)}
              data-testid="notifications-button"
            >
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )} */}

          {/* Profile Menu with Avatar */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileMenuOpen}
              color="inherit"
              data-testid="profile-button"
              size="large"
            >
              <Avatar alt={user.displayName} src={user.photoURL} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Navigation Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigation("/")}>Home</MenuItem>
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileMenuAnchorEl}
          open={Boolean(profileMenuAnchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={() => handleNavigation("/profile")}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Notification Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 300 }}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <ListItem
                    button
                    key={notification.id}
                    onClick={() => markNotificationAsRead(notification.id)}
                    sx={{ backgroundColor: notification.color }}
                  >
                    <ListItemText
                      primary={notification.name}
                      secondary={notification.message}
                      sx={{
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
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
