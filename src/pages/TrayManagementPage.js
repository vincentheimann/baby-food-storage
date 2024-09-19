// /src/pages/TrayManagementPage.js
import React, { useState } from "react";
import TrayDetails from "../components/TrayDetails"; // Detailed tray management view
import AddTrayModal from "../components/AddTrayModal"; // Modal for adding trays
import { Button, Typography, Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2"; // Correct import for Grid2

const TrayManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Grid container spacing={3} direction="column" alignItems="center">
      {/* Page Title */}
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
          Manage Your Trays
        </Typography>
      </Grid>

      {/* Button to open modal for adding new tray */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Tray
        </Button>
      </Grid>

      {/* Detailed view of each tray */}
      <Grid item xs={12} style={{ width: "100%" }}>
        <TrayDetails />
      </Grid>

      {/* Add Tray Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <AddTrayModal onClose={() => setIsModalOpen(false)} />
      </Dialog>
    </Grid>
  );
};

export default TrayManagementPage;
