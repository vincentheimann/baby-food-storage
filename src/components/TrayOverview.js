// /src/components/TrayOverview.js
import React, { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";

const TrayOverview = () => {
  const { currentUser } = useAuth();
  const [trays, setTrays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const trayCollection = collection(db, `users/${currentUser.uid}/trays`);
      const unsubscribe = onSnapshot(trayCollection, (snapshot) => {
        const trayData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrays(trayData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading trays...</div>;
  }

  return (
    <div>
      <h2>Your Trays</h2>
      <ul>
        {trays.map((tray) => (
          <li key={tray.id}>
            {tray.name}: {tray.used}/{tray.capacity} cubes used
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrayOverview;
