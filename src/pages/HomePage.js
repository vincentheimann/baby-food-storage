import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TrayOverview from "../components/TrayOverview"; // Shows tray usage
import AddAlimentModal from "../components/AddAlimentModal"; // Modal for adding aliment
import { useNavigate } from "react-router-dom";
import { fetchAliments } from "../services/alimentService"; // Fetch aliments service
import { fetchTrays } from "../services/trayService"; // Fetch trays service

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAlimentModalOpen, setIsAlimentModalOpen] = useState(false); // Modal state
  const [aliments, setAliments] = useState([]); // Store fetched aliments
  const [trayMap, setTrayMap] = useState({}); // Map tray IDs to tray names
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        // Fetch aliments and trays
        const alimentData = await fetchAliments(currentUser.uid);
        const trayData = await fetchTrays(currentUser.uid);

        // Create a tray ID to tray name map
        const trayMapData = trayData.reduce((map, tray) => {
          map[tray.id] = tray.name;
          return map;
        }, {});

        setAliments(alimentData);
        setTrayMap(trayMapData); // Set the tray map for later use
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser]);

  const goToTrayManagement = () => {
    navigate("/trays");
  };

  if (loading) {
    return <div>Loading aliments and trays...</div>;
  }

  return (
    <div>
      <h2>Welcome, {currentUser?.displayName}!</h2>

      {/* Summary of trays */}
      <TrayOverview />

      {/* Aliment Summary */}
      <h3>Your Aliments</h3>
      <ul>
        {aliments.map((aliment) => (
          <li key={aliment.id}>
            {aliment.name} ({aliment.type}) - Total: {aliment.totalQuantity}{" "}
            cubes
            <ul>
              {/* Ensure trays array exists before mapping */}
              {aliment.trays && aliment.trays.length > 0 ? (
                aliment.trays.map((tray) => (
                  <li key={tray.trayId}>
                    {/* Display tray name using the trayMap */}
                    Stored in {trayMap[tray.trayId]}: {tray.quantity} cubes
                  </li>
                ))
              ) : (
                <li>No trays assigned</li>
              )}
            </ul>
          </li>
        ))}
      </ul>

      {/* Button to navigate to Tray Management */}
      <button onClick={goToTrayManagement}>Manage Trays</button>

      {/* Button to add a new aliment */}
      <button onClick={() => setIsAlimentModalOpen(true)}>Add Aliment</button>

      {/* Aliment modal for adding new food */}
      {isAlimentModalOpen && (
        <AddAlimentModal onClose={() => setIsAlimentModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
