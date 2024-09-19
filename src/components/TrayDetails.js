// /src/components/TrayDetails.js
import React, { useState, useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";

const TrayDetails = () => {
  const { currentUser } = useAuth();
  const [trays, setTrays] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const trayCollection = collection(db, `users/${currentUser.uid}/trays`);
      const unsubscribe = onSnapshot(trayCollection, (snapshot) => {
        const trayData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          aliments: doc.data().aliments || [], // Ensure aliments is at least an empty array
        }));
        setTrays(trayData);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div>
      <h3>Tray Details</h3>
      <ul>
        {trays.map((tray) => (
          <li key={tray.id}>
            <span>
              {tray.name} - {tray.used}/{tray.capacity} cubes
            </span>
            {/* Safely map over aliments, which should now always be an array */}
            <ul>
              {tray.aliments.map((aliment) => (
                <li key={aliment.alimentId}>
                  {aliment.name}: {aliment.quantity} cubes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrayDetails;
