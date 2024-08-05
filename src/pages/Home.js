// src/pages/Home.js
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
import AlimentForm from "../components/AlimentForm";
import { BacContext } from "../context/BacContext";
import { AlimentContext } from "../context/AlimentContext";

const Home = () => {
  const { bacs } = useContext(BacContext);
  const {
    aliments,
    addAliment,
    decrementAlimentQuantity,
    incrementAlimentQuantity,
  } = useContext(AlimentContext);

  const filterAlimentsByType = (type) => {
    return aliments.filter((aliment) => aliment.type === type);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Accueil
      </Typography>
      <Grid container spacing={3}>
        {bacs.map((bac) => (
          <Grid item xs={12} md={6} key={bac.id}>
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
              Ajouter un aliment
            </Typography>
            <AlimentForm onSubmit={addAliment} />
          </CardContent>
        </Card>
      </Box>
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Liste des aliments
            </Typography>
            <AlimentList
              aliments={aliments}
              onDecrement={decrementAlimentQuantity}
              onIncrement={incrementAlimentQuantity}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
