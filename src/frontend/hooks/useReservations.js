import { useEffect, useState } from "react";
import { getAll, create, update, cancel } from "../services/reservation.service";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll().then((data) => {
      setReservations(data?.data || data || []);
    }).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  const createReservation = async (data) => {
    const res = await create(data);
    const newItem = res?.data || res;
    setReservations((prev) => [...prev, newItem]);
    return newItem;
  };

  const updateReservation = async (id, data) => {
    const res = await update(id, data);
    const updated = res?.data || res;
    setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));
    return updated;
  };

  const cancelReservation = async (id) => {
    const res = await cancel(id);
    const updated = res?.data || res;
    setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));
    return updated;
  };

  return { reservations, loading, error, createReservation, updateReservation, cancelReservation };
};

export default useReservations;
