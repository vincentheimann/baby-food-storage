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
import { BacContext } from "../contexts/BacContext";
import { AlimentContext } from "../contexts/AlimentContext";

const Home = () => {
  const { bacs } = useContext(BacContext);
  const {
    aliments,
    addAliment,
    decrementAlimentQuantity,
    incrementAlimentQuantity,
    updateAliment,
  } = useContext(AlimentContext);

  const filterAlimentsByType = (type) => {
    return aliments.filter((aliment) => aliment.type === type);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8, padding: { xs: 2, sm: 4 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
          >
            Home
          </Typography>
        </Grid>
        {bacs.map((bac) => (
          <Grid item xs={12} sm={6} key={bac.id} sx={{ padding: { xs: 1, sm: 2 } }}>
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
            <Typography variant="h5" component="h2" gutterBottom>
              Add a food item
            </Typography>
            <AlimentForm onSubmit={addAliment} />
          </CardContent>
        </Card>
      </Box>
      <Box mt={5}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Food list
            </Typography>
            <AlimentList
              aliments={aliments}
              onDecrement={decrementAlimentQuantity}
              onIncrement={incrementAlimentQuantity}
              onUpdate={updateAliment}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
