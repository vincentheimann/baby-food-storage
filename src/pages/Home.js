import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Container,
  CircularProgress,
} from "@mui/material";
import BacCard from "../components/BacCard";
import AlimentList from "../components/AlimentList";
import AlimentForm from "../components/AlimentForm";
import AlimentModal from "../components/AlimentModal"; // Import AlimentModal
import { BacContext } from "../contexts/BacContext";
import { AlimentContext } from "../contexts/AlimentContext";

const Home = () => {
  const { bacs, loading: loadingBacs } = useContext(BacContext);
  const {
    aliments,
    addAliment,
    decrementAlimentQuantity,
    incrementAlimentQuantity,
    updateAliment,
    loading: loadingAliments,
  } = useContext(AlimentContext);

  const [selectedAliment, setSelectedAliment] = useState(null); // Manage selected aliment for modal

  const filterAlimentsByType = (type) => {
    return aliments.filter((aliment) => aliment.type === type);
  };

  const handleItemClick = (aliment) => {
    setSelectedAliment(aliment); // Set aliment when clicked
  };

  const handleCloseModal = () => {
    setSelectedAliment(null); // Close modal
  };

  if (loadingBacs || loadingAliments) {
    // Show a loading spinner while bacs or aliments are being fetched
    return (
      <Container
        maxWidth="lg"
        sx={{ mt: 4, mb: 8, padding: { xs: 2, sm: 4 }, textAlign: "center" }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your data...
        </Typography>
      </Container>
    );
  }

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
          <Grid
            item
            xs={12}
            sm={6}
            key={bac.id}
            sx={{ padding: { xs: 1, sm: 2 } }}
          >
            <BacCard
              bac={bac} // Pass entire bac object to BacCard
              aliments={filterAlimentsByType(bac.type)} // Filter aliments by bac type
              onItemClick={handleItemClick} // Pass click handler
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
              onItemClick={handleItemClick} // Pass click handler for AlimentList too
            />
          </CardContent>
        </Card>
      </Box>

      {/* Aliment Modal */}
      {selectedAliment && (
        <AlimentModal
          open={Boolean(selectedAliment)}
          handleClose={handleCloseModal}
          aliment={selectedAliment} // Pass selected aliment to AlimentModal
          handleSave={updateAliment} // Use the update function to save changes
        />
      )}
    </Container>
  );
};

export default Home;
