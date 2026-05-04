import { useState } from "react";
import { getByPeriod, getByResource, getByLocation } from "../services/report.service";

const useReports = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchByPeriod = async (start, end) => {
    setLoading(true);
    try {
      const res = await getByPeriod(start, end);
      setData((d) => ({ ...d, period: res?.data || res || [] }));
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const fetchByResource = async () => {
    setLoading(true);
    try {
      const res = await getByResource();
      setData((d) => ({ ...d, resource: res?.data || res || [] }));
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const fetchByLocation = async () => {
    setLoading(true);
    try {
      const res = await getByLocation();
      setData((d) => ({ ...d, location: res?.data || res || [] }));
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return { data, loading, error, fetchByPeriod, fetchByResource, fetchByLocation };
};

export default useReports;
