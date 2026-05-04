import { useState } from "react";
import {
  getByPeriod,
  getByResource,
  getByLocation,
} from "../services/report.service";

const useReports = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchByPeriod = async (start, end) => {
    try {
      setLoading(true);
      setError(null);
      const result = await getByPeriod(start, end);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "Failed to fetch period report");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchByResource = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getByResource();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "Failed to fetch resource report");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchByLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getByLocation();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || "Failed to fetch location report");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchByPeriod,
    fetchByResource,
    fetchByLocation,
  };
};

export default useReports;
