// /src/pages/TrayManagementPage.js
import React, { useState } from "react";
import TrayDetails from "../components/TrayDetails"; // Detailed tray management view
import AddTrayModal from "../components/AddTrayModal"; // Modal for adding trays

const TrayManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h2>Manage Your Trays</h2>

      {/* Button to open modal for adding new tray */}
      <button onClick={() => setIsModalOpen(true)}>Add New Tray</button>

      {/* Detailed view of each tray */}
      <TrayDetails />

      {isModalOpen && <AddTrayModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TrayManagementPage;
