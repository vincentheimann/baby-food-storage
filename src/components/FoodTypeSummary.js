// /src/components/FoodTypeSummary.js
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import AddAlimentModal from "./AddAlimentModal";
import { differenceInDays, format } from "date-fns"; // A library to easily manipulate dates
import SnackBarAlert from "./SnackBar";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Button,
} from "@mui/material";

const FoodTypeSummary = () => {
  const { currentUser } = useAuth();
  const [aliments, setAliments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const today = new Date();

  useEffect(() => {
    if (currentUser) {
      const alimentCollection = collection(
        db,
        `users/${currentUser.uid}/aliments`
      );

      const unsubscribe = onSnapshot(alimentCollection, (snapshot) => {
        const alimentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAliments(alimentData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading food types...</div>;
  }

  // Filter aliments that are nearing expiration (e.g., within 3 days)
  const expiringSoon = aliments.filter((aliment) => {
    const expirationDate = new Date(aliment.expirationDate);
    return (
      differenceInDays(expirationDate, today) <= 3 &&
      differenceInDays(expirationDate, today) >= 0
    );
  });

  const handleCloseSnackBar = () => {
    setSnackBarOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Food Type Summary
      </Typography>

      {/* Expiration Alerts */}
      {expiringSoon.length > 0 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Expiring Soon
          </Typography>
          <ul>
            {expiringSoon.map((aliment) => (
              <li key={aliment.id}>
                <Chip
                  label={`${aliment.name} expires on ${format(
                    new Date(aliment.expirationDate),
                    "yyyy-MM-dd"
                  )}`}
                  color="warning"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Grid container spacing={3}>
        {aliments.map((aliment) => {
          const totalQuantity = aliment.totalQuantity || 0;
          const remainingQuantity = aliment.trays
            ? aliment.trays.reduce((sum, tray) => sum + tray.quantity, 0)
            : 0;
          const progressPercentage =
            (remainingQuantity / totalQuantity) * 100 || 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={aliment.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{aliment.name}</Typography>
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

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        sx={{ mt: 3 }}
      >
        Add New Aliment
      </Button>

      {isModalOpen && <AddAlimentModal onClose={() => setIsModalOpen(false)} />}

      {/* SnackBar Alert */}
      <SnackBarAlert
        open={snackBarOpen}
        onClose={handleCloseSnackBar}
        message="Some aliments are expiring soon!"
        severity="warning"
      />
    </div>
  );
};

export default FoodTypeSummary;
