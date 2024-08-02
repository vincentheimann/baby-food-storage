// src/pages/Dashboard.js
import React from "react";
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

const initialAliments = [
  {
    id: 1,
    nom: "Poulet",
    dateCongelation: "2024-07-01",
    datePeremption: "2024-08-01",
    type: "Proteins",
  },
  {
    id: 2,
    nom: "Carottes",
    dateCongelation: "2024-07-05",
    datePeremption: "2024-08-05",
    type: "Vegetables",
  },
  {
    id: 3,
    nom: "Pâtes",
    dateCongelation: "2024-07-10",
    datePeremption: "2024-08-10",
    type: "Carbs",
  },
  {
    id: 4,
    nom: "Pommes",
    dateCongelation: "2024-07-15",
    datePeremption: "2024-08-15",
    type: "Others",
  },
];

const Dashboard = () => {
  const filterAlimentsByType = (type) => {
    return initialAliments.filter((aliment) => aliment.type === type);
  };

  const alimentsProchesDePeremption = initialAliments.filter((aliment) => {
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
        <Grid item xs={12}>
          <BacCard
            color="blue"
            type="Proteins"
            aliments={filterAlimentsByType("Proteins")}
          />
        </Grid>
        <Grid item xs={12}>
          <BacCard
            color="green"
            type="Vegetables"
            aliments={filterAlimentsByType("Vegetables")}
          />
        </Grid>
        <Grid item xs={12}>
          <BacCard
            color="red"
            type="Carbs"
            aliments={filterAlimentsByType("Carbs")}
          />
        </Grid>
        <Grid item xs={12}>
          <BacCard
            color="pink"
            type="Others"
            aliments={filterAlimentsByType("Others")}
          />
        </Grid>
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
