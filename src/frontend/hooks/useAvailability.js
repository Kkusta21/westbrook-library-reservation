import { useState } from "react";
import api from "../services/api";

const useAvailability = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkAvailability = async (locationId, startTime, endTime) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/availability", {
        params: {
          locationId,
          startTime,
          endTime,
        },
      });

      setResults(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || "Failed to check availability");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    checkAvailability,
  };
};

export default useAvailability;
