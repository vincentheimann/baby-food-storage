// src/pages/Dashboard.js
import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import BacCard from "../components/BacCard";
import AlimentList from "../components/AlimentList";
import { BacContext } from "../context/BacContext";
import { AlimentContext } from "../context/AlimentContext";

const Dashboard = () => {
  const { bacs } = useContext(BacContext);
  const { aliments } = useContext(AlimentContext);

  const filterAlimentsByType = (type) => {
    return aliments.filter((aliment) => aliment.type === type);
  };

  const alimentsProchesDePeremption = aliments.filter((aliment) => {
    const today = new Date();
    const peremptionDate = new Date(aliment.datePeremption);
    const diffDays = (peremptionDate - today) / (1000 * 60 * 60 * 24);
    return diffDays <= 7; // Aliments dont la date de péremption est dans 7 jours ou moins
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Tableau de bord
      </Typography>
      <Grid container spacing={3}>
        {bacs.map((bac) => (
          <Grid item xs={12} key={bac.id}>
            <BacCard
              color={bac.color}
              type={bac.type}
              aliments={filterAlimentsByType(bac.type)}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Aliments à consommer en priorité
            </Typography>
            <AlimentList aliments={alimentsProchesDePeremption} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Dashboard;
