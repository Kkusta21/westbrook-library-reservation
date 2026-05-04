import { useState } from "react";
import api from "../services/api";

const useAvailability = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkAvailability = async (locationId, startTime, endTime) => {
    try {
      setLoading(true);
      const response = await api.get("/api/availability", {
        params: { location_id: locationId, start_time: startTime, end_time: endTime },
      });
      setResults(response.data?.data || response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, checkAvailability };
};

export default useAvailability;
