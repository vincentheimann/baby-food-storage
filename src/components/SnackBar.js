// /src/components/SnackBar.js
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackBarAlert = ({
  open,
  onClose,
  message,
  severity,
  duration = 6000,
  position = { vertical: "bottom", horizontal: "center" },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={position} // Allows customizing the position of the Snackbar
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarAlert;
