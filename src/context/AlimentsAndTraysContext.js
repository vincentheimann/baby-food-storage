// /src/context/AlimentsAndTraysContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "./AuthContext";

const AlimentsAndTraysContext = createContext();

export const useAlimentsAndTrays = () => {
  return useContext(AlimentsAndTraysContext);
};

export const AlimentsAndTraysProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [aliments, setAliments] = useState([]);
  const [trays, setTrays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const userId = currentUser.uid;

      // Real-time listener for aliments
      const alimentCollection = collection(db, `users/${userId}/aliments`);
      const unsubscribeAliments = onSnapshot(alimentCollection, (snapshot) => {
        const alimentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAliments(alimentData);
      });

      // Real-time listener for trays
      const trayCollection = collection(db, `users/${userId}/trays`);
      const unsubscribeTrays = onSnapshot(trayCollection, (snapshot) => {
        const trayData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrays(trayData);
        setLoading(false);
      });

      // Cleanup subscriptions on unmount
      return () => {
        unsubscribeAliments();
        unsubscribeTrays();
      };
    } else {
      // Reset state when no user is logged in
      setAliments([]);
      setTrays([]);
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <AlimentsAndTraysContext.Provider value={{ aliments, trays, loading }}>
      {children}
    </AlimentsAndTraysContext.Provider>
  );
};
