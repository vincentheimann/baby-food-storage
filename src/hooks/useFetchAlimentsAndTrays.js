// /src/hooks/useFetchAlimentsAndTrays.js
import { useState, useEffect } from "react";
import { fetchAliments } from "../services/alimentService";
import { fetchTrays } from "../services/trayService";

export const useFetchAlimentsAndTrays = (userId) => {
  const [aliments, setAliments] = useState([]); // Ensure it's initialized as an empty array
  const [trayMap, setTrayMap] = useState({});
  const [trays, setTrays] = useState([]); // Ensure it's initialized as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (userId) {
        try {
          const alimentData = await fetchAliments(userId);
          const trayData = await fetchTrays(userId);

          const trayMapData = trayData.reduce((map, tray) => {
            map[tray.id] = tray.name;
            return map;
          }, {});

          setAliments(alimentData || []); // Ensure aliments is never undefined
          setTrays(trayData || []); // Ensure trays is never undefined
          setTrayMap(trayMapData);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [userId]);

  return { aliments, trayMap, trays, loading };
};
