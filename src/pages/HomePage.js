// /src/pages/HomePage.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TrayOverview from "../components/TrayOverview"; // Shows tray usage
import AddAlimentModal from "../components/AddAlimentModal"; // Modal for adding aliment
import EditAlimentModal from "../components/EditAlimentModal"; // Modal for editing aliment
import { useNavigate } from "react-router-dom";
import { useFetchAlimentsAndTrays } from "../hooks/useFetchAlimentsAndTrays"; // Custom hook for fetching aliments and trays
import {
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Grid,
} from "@mui/material";

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { aliments, trayMap, loading } = useFetchAlimentsAndTrays(
    currentUser?.uid
  );

  // Modal state management
  const [modalState, setModalState] = useState({
    open: false,
    type: null,
    aliment: null,
  });

  const goToTrayManagement = () => navigate("/trays");

  const openModal = (type, aliment = null) => {
    setModalState({ open: true, type, aliment });
  };

  const closeModal = () => {
    setModalState({ open: false, type: null, aliment: null });
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

      {/* Tray Overview */}
      <Grid item xs={12}>
        <TrayOverview />
      </Grid>

      {/* Aliment Summary */}
      <Grid item xs={12}>
        <Typography variant="h5" component="h3">
          Your Aliments
        </Typography>

        {/* Handle empty state */}
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
                        onClick={() => openModal("edit", aliment)}
                        sx={{ cursor: "pointer", color: "primary.main" }}
                        aria-label={`Edit ${aliment.name}`} // Accessibility label
                        role="button" // Role as button
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

      {/* Manage Trays Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={goToTrayManagement}
        >
          Manage Trays
        </Button>
      </Grid>

      {/* Add New Aliment Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => openModal("add")}
        >
          Add A New Food Item
        </Button>
      </Grid>

      {/* Add Aliment Modal */}
      {modalState.open && modalState.type === "add" && (
        <AddAlimentModal onClose={closeModal} />
      )}

      {/* Edit Aliment Modal */}
      {modalState.open && modalState.type === "edit" && modalState.aliment && (
        <EditAlimentModal aliment={modalState.aliment} onClose={closeModal} />
      )}
    </Grid>
  );
};

export default HomePage;
