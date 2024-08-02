// src/pages/Home.js
import React, { useState } from "react";
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
import AlimentForm from "../components/AlimentForm";

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
];

const Home = () => {
  const [aliments, setAliments] = useState(initialAliments);

  const handleAddAliment = (newAliment) => {
    setAliments([...aliments, { ...newAliment, id: aliments.length + 1 }]);
  };

  const filterAlimentsByType = (type) => {
    return aliments.filter((aliment) => aliment.type === type);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Accueil
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BacCard
            color="blue"
            type="Proteins"
            aliments={filterAlimentsByType("Proteins")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BacCard
            color="green"
            type="Vegetables"
            aliments={filterAlimentsByType("Vegetables")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BacCard
            color="red"
            type="Carbs"
            aliments={filterAlimentsByType("Carbs")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
              Ajouter un aliment
            </Typography>
            <AlimentForm onSubmit={handleAddAliment} />
          </CardContent>
        </Card>
      </Box>
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Liste des aliments
            </Typography>
            <AlimentList aliments={aliments} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
