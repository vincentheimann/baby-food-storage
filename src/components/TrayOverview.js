// /src/components/TrayOverview.js
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { CircularProgress, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const TrayOverview = () => {
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
        }));
        setTrays(trayData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center">
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
      {trays.map((tray) => (
        <Grid item key={tray.id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{tray.name}</Typography>
              <Typography variant="body2">
                {tray.used}/{tray.capacity} cubes used
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TrayOverview;
