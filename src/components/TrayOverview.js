// /src/components/TrayOverview.js
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditTrayModal from "./EditTrayModal"; // Import the modal

const TrayOverview = () => {
  const { currentUser } = useAuth();
  const [trays, setTrays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditTrayModalOpen, setIsEditTrayModalOpen] = useState(false); // Modal state
  const [selectedTray, setSelectedTray] = useState(null); // Selected tray for editing

  useEffect(() => {
    if (currentUser) {
      const trayCollection = collection(db, `users/${currentUser.uid}/trays`);
      const unsubscribe = onSnapshot(trayCollection, (snapshot) => {
        const trayData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrays(trayData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const openEditModal = (tray) => {
    setSelectedTray(tray); // Set the tray to be edited
    setIsEditTrayModalOpen(true); // Open the modal
  };

  const closeEditModal = () => {
    setIsEditTrayModalOpen(false);
    setSelectedTray(null);
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
          Loading trays...
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Your Trays</Typography>
      </Grid>
      {trays.map((tray) => {
        // Ensure that default values are used if data is missing
        const used = tray.used ?? 0;
        const capacity = tray.capacity ?? 1; // Avoid division by zero, default to 1 if missing
        const progressPercentage = Math.min((used / capacity) * 100, 100); // Avoid exceeding 100%

        return (
          <Grid item key={tray.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  onClick={() => openEditModal(tray)} // Open the edit modal on title click
                  sx={{ cursor: "pointer", color: "primary.main" }} // Makes it clickable with pointer
                >
                  {tray.name}
                </Typography>
                <Typography variant="body2">
                  {used}/{capacity} cubes used
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progressPercentage}
                  sx={{ mt: 1, mb: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        );
      })}

      {/* Edit Tray Modal */}
      {isEditTrayModalOpen && selectedTray && (
        <EditTrayModal tray={selectedTray} onClose={closeEditModal} />
      )}
    </Grid>
  );
};

export default TrayOverview;
