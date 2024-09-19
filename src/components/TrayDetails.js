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
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const TrayDetails = () => {
  const { currentUser } = useAuth();
  const [trays, setTrays] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const trayCollection = collection(db, `users/${currentUser.uid}/trays`);
      const unsubscribe = onSnapshot(trayCollection, (snapshot) => {
        const trayData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          aliments: doc.data().aliments || [],
        }));
        setTrays(trayData);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Tray Details</Typography>
      </Grid>
      {trays.map((tray) => (
        <Grid item key={tray.id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{tray.name}</Typography>
              <Typography variant="body2">
                {tray.used}/{tray.capacity} cubes
              </Typography>

              <List>
                {tray.aliments.map((aliment) => (
                  <ListItem key={aliment.alimentId}>
                    <ListItemText
                      primary={`${aliment.name}: ${aliment.quantity} cubes`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TrayDetails;
