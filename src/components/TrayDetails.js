// /src/components/TrayDetails.js
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const TrayDetails = () => {
  const { currentUser } = useAuth();
  const [trays, setTrays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const trayCollection = collection(db, `users/${currentUser.uid}/trays`);
      const unsubscribe = onSnapshot(trayCollection, (snapshot) => {
        const trayData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          aliments: doc.data().aliments || [], // Ensure aliments is always an array
        }));
        setTrays(trayData);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "50vh" }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading tray details...
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Tray Details</Typography>
      </Grid>
      {trays.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No trays available.</Typography>
        </Grid>
      ) : (
        trays.map((tray) => {
          // Default values for safety
          const used = tray.used ?? 0;
          const capacity = tray.capacity ?? 1; // Prevent divide by zero issues

          return (
            <Grid item key={tray.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{tray.name}</Typography>
                  <Typography variant="body2">
                    {used}/{capacity} cubes used
                  </Typography>

                  {tray.aliments.length === 0 ? (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 2 }}
                    >
                      No aliments added to this tray.
                    </Typography>
                  ) : (
                    <List>
                      {tray.aliments.map((aliment) => (
                        <ListItem key={aliment.alimentId}>
                          <ListItemText
                            primary={`${aliment?.name ?? "Unknown Aliment"}: ${
                              aliment?.quantity ?? 0
                            } cubes`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default TrayDetails;
