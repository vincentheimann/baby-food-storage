// /src/hooks/useFetchAlimentsAndTrays.js
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export const useFetchAlimentsAndTrays = (userId) => {
  const [aliments, setAliments] = useState([]);
  const [trays, setTrays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Fetch aliments in real time
    const alimentCollection = collection(db, `users/${userId}/aliments`);
    const alimentUnsubscribe = onSnapshot(alimentCollection, (snapshot) => {
      const alimentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAliments(alimentData);
    });

    // Fetch trays in real time
    const trayCollection = collection(db, `users/${userId}/trays`);
    const trayUnsubscribe = onSnapshot(trayCollection, (snapshot) => {
      const trayData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrays(trayData);
      setLoading(false);
    });

    // Cleanup on component unmount
    return () => {
      alimentUnsubscribe();
      trayUnsubscribe();
    };
  }, [userId]);

  return { aliments, trays, loading };
};
