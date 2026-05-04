import { useEffect, useState } from "react";
import {
  getAll,
  create,
  update,
  cancel,
} from "../services/reservation.service";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await getAll();
      setReservations(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const createReservation = async (data) => {
    try {
      const newReservation = await create(data);
      setReservations((prev) => [...prev, newReservation]);
      return newReservation;
    } catch (err) {
      setError(err.message || "Failed to create reservation");
      throw err;
    }
  };

  const updateReservation = async (id, data) => {
    try {
      const updatedReservation = await update(id, data);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? updatedReservation : r))
      );
      return updatedReservation;
    } catch (err) {
      setError(err.message || "Failed to update reservation");
      throw err;
    }
  };

  const cancelReservation = async (id) => {
    try {
      const cancelledReservation = await cancel(id);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? cancelledReservation : r))
      );
      return cancelledReservation;
    } catch (err) {
      setError(err.message || "Failed to cancel reservation");
      throw err;
    }
  };

  return {
    reservations,
    loading,
    error,
    createReservation,
    updateReservation,
    cancelReservation,
  };
};

export default useReservations;
