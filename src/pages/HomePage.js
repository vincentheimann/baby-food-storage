// /src/pages/HomePage.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddAlimentModal from "../components/AddAlimentModal";
import EditAlimentModal from "../components/EditAlimentModal";
import AddTrayModal from "../components/AddTrayModal";
import EditTrayModal from "../components/EditTrayModal";
import {
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useFetchAlimentsAndTrays } from "../hooks/useFetchAlimentsAndTrays";
import { deleteTray } from "../services/trayService"; // Import deleteTray function

const HomePage = () => {
  const { currentUser } = useAuth();
  const { aliments, trays, loading } = useFetchAlimentsAndTrays(
    currentUser?.uid
  );

  // Modal state management
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    item: null,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to manage delete dialog
  const [trayToDelete, setTrayToDelete] = useState(null); // Tray selected for deletion

  const openModal = (type, item = null) => {
    setModalState({ open: true, type, item });
  };

  const closeModal = () => {
    setModalState({ open: false, type: null, item: null });
  };

  const openDeleteDialog = (tray) => {
    setTrayToDelete(tray);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTrayToDelete(null);
  };

  const handleDeleteTray = async () => {
    if (currentUser?.uid && trayToDelete?.id) {
      try {
        await deleteTray(currentUser.uid, trayToDelete.id); // Call the delete tray service
        closeDeleteDialog();
      } catch (error) {
        console.error("Error deleting tray:", error);
      }
    }
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading aliments and trays...
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} direction="column" alignItems="center">
      {/* Welcome Message */}
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
          Welcome, {currentUser?.displayName}!
        </Typography>
      </Grid>

      {/* Aliment Section */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h3">
          Your Aliments
        </Typography>

        {aliments.length === 0 ? (
          <Typography>No food items added yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {aliments.map((aliment) => {
              const totalQuantity = aliment.totalQuantity || 0;
              const remainingQuantity = (aliment.trays || []).reduce(
                (sum, tray) => sum + tray.quantity,
                0
              );
              const progressPercentage =
                (remainingQuantity / totalQuantity) * 100 || 0;

              return (
                <Grid item key={aliment.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        onClick={() => openModal("editAliment", aliment)}
                        sx={{ cursor: "pointer", color: "primary.main" }}
                        aria-label={`Edit ${aliment.name}`}
                        role="button"
                      >
                        {aliment.name} ({aliment.type})
                      </Typography>
                      <Typography variant="body2">
                        Total: {remainingQuantity}/{totalQuantity} cubes
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={progressPercentage}
                        sx={{ mt: 1, mb: 1 }}
                      />
                      <Chip
                        label={
                          progressPercentage < 20
                            ? "Low Stock"
                            : progressPercentage > 80
                            ? "Well-Stocked"
                            : "Moderate"
                        }
                        color={
                          progressPercentage < 20
                            ? "error"
                            : progressPercentage > 80
                            ? "success"
                            : "warning"
                        }
                      />
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>

      {/* Add New Aliment Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => openModal("addAliment")}
        >
          Add A New Food Item
        </Button>
      </Grid>

      {/* Trays Section */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h3">
          Your Trays
        </Typography>

        {trays.length === 0 ? (
          <Typography>No trays added yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {trays.map((tray) => (
              <Grid item key={tray.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {tray.name}
                    </Typography>
                    <Typography variant="body2">
                      {tray.used}/{tray.capacity} cubes used
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(tray.used / tray.capacity) * 100 || 0}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </CardContent>
                  <CardActions>
                    <IconButton
                      aria-label="edit tray"
                      onClick={() => openModal("editTray", tray)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete tray"
                      onClick={() => openDeleteDialog(tray)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      {/* Add Tray Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openModal("addTray")}
        >
          Add A New Tray
        </Button>
      </Grid>

      {/* Modals */}
      {modalState.open && modalState.type === "addAliment" && (
        <AddAlimentModal onClose={closeModal} />
      )}
      {modalState.open &&
        modalState.type === "editAliment" &&
        modalState.item && (
          <EditAlimentModal aliment={modalState.item} onClose={closeModal} />
        )}
      {modalState.open && modalState.type === "addTray" && (
        <AddTrayModal onClose={closeModal} />
      )}
      {modalState.open && modalState.type === "editTray" && modalState.item && (
        <EditTrayModal tray={modalState.item} onClose={closeModal} />
      )}

      {/* Delete Tray Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Tray"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the tray "{trayToDelete?.name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTray} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default HomePage;
