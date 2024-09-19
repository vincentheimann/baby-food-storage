// /src/components/FoodTypeSummary.js
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import AddAlimentModal from "./AddAlimentModal";
import { differenceInDays, format } from "date-fns"; // A library to easily manipulate dates
import SnackBarAlert from "./SnackBar";

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
      <h2>Food Type Summary</h2>

      {/* Expiration Alerts */}
      {expiringSoon.length > 0 && (
        <div>
          <h3>Expiring Soon</h3>
          <ul>
            {expiringSoon.map((aliment) => (
              <li key={aliment.id} style={{ color: "red" }}>
                {aliment.name} expires on{" "}
                {format(new Date(aliment.expirationDate), "yyyy-MM-dd")}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul>
        {aliments.map((aliment) => (
          <li key={aliment.id}>
            {aliment.name}: {aliment.quantity} cubes
          </li>
        ))}
      </ul>
      <button onClick={() => setIsModalOpen(true)}>Add New Aliment</button>
      {isModalOpen && <AddAlimentModal onClose={() => setIsModalOpen(false)} />}
      <div>
        <SnackBarAlert
          open={snackBarOpen}
          onClose={handleCloseSnackBar}
          message="Some aliments are expiring soon!"
          severity="warning"
        />
      </div>
    </div>
  );
};

export default FoodTypeSummary;
