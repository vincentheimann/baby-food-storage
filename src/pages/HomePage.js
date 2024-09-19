// /src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TrayOverview from "../components/TrayOverview"; // Shows tray usage
import AddAlimentModal from "../components/AddAlimentModal"; // Modal for adding aliment
import { useNavigate } from "react-router-dom";
import { fetchAliments } from "../services/alimentService"; // Fetch aliments service
import { fetchTrays } from "../services/trayService"; // Fetch trays service
import {
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAlimentModalOpen, setIsAlimentModalOpen] = useState(false);
  const [aliments, setAliments] = useState([]);
  const [trayMap, setTrayMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        const alimentData = await fetchAliments(currentUser.uid);
        const trayData = await fetchTrays(currentUser.uid);

        const trayMapData = trayData.reduce((map, tray) => {
          map[tray.id] = tray.name;
          return map;
        }, {});

        setAliments(alimentData);
        setTrayMap(trayMapData);
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser]);

  const goToTrayManagement = () => {
    navigate("/trays");
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
        <Grid container spacing={2}>
          {aliments.map((aliment) => (
            <Grid item key={aliment.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {aliment.name} ({aliment.type})
                  </Typography>
                  <Typography variant="body2">
                    Total: {aliment.totalQuantity} cubes
                  </Typography>
                  <List>
                    {aliment.trays && aliment.trays.length > 0 ? (
                      aliment.trays.map((tray) => (
                        <ListItem key={tray.trayId}>
                          <ListItemText
                            primary={`Stored in ${trayMap[tray.trayId]}: ${
                              tray.quantity
                            } cubes`}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No trays assigned" />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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

      {/* Add Aliment Button */}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsAlimentModalOpen(true)}
        >
          Add Aliment
        </Button>
      </Grid>

      {/* Add Aliment Modal */}
      {isAlimentModalOpen && (
        <AddAlimentModal onClose={() => setIsAlimentModalOpen(false)} />
      )}
    </Grid>
  );
};

export default HomePage;
