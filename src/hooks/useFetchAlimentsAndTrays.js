// /src/hooks/useFetchAlimentsAndTrays.js
import { useState, useEffect } from "react";
import { fetchAliments } from "../services/alimentService";
import { fetchTrays } from "../services/trayService";

export const useFetchAlimentsAndTrays = (userId) => {
  const [aliments, setAliments] = useState([]);
  const [trayMap, setTrayMap] = useState({});
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

          setAliments(alimentData);
          setTrayMap(trayMapData);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [userId]);

  return { aliments, trayMap, loading };
};
