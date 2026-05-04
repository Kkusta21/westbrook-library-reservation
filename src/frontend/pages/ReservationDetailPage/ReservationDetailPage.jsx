import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import ReservationForm from "../../components/reservations/ReservationForm/ReservationForm";
import {
  getById,
} from "../../services/reservation.service";
import useReservations from "../../hooks/useReservations";

const ReservationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cancelReservation, updateReservation } = useReservations();

  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoading(true);
        const data = await getById(id);
        setReservation(data);
      } catch (err) {
        setError("Failed to load reservation.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (!confirmed) return;

    await cancelReservation(id);
    navigate("/reservations");
  };

  const handleModify = async (data) => {
    await updateReservation(id, data);
    setIsModalOpen(false);
    const updated = await getById(id);
    setReservation(updated);
  };

  if (loading) {
    return (
      <PageWrapper title="Reservation Detail">
        <p>Loading...</p>
      </PageWrapper>
    );
  }

  if (error || !reservation) {
    return (
      <PageWrapper title="Reservation Detail">
        <p style={{ color: "red" }}>{error || "Reservation not found."}</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Reservation Detail">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <DetailItem label="ID" value={reservation.id} />
        <DetailItem label="Patron Name" value={reservation.patron_name} />
        <DetailItem label="Email" value={reservation.patron_email} />
        <DetailItem label="Phone" value={reservation.patron_phone} />
        <DetailItem label="Resource" value={reservation.resource_name} />
        <DetailItem label="Date" value={reservation.reservation_date} />
        <DetailItem label="Start Time" value={reservation.start_time} />
        <DetailItem label="End Time" value={reservation.end_time} />
        <DetailItem
          label="Status"
          value={<Badge label={reservation.status} />}
        />
        <DetailItem label="Notes" value={reservation.notes} />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button
          label="Modify"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        />
        <Button
          label="Cancel Reservation"
          variant="danger"
          onClick={handleCancel}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ReservationForm
          initialData={reservation}
          onSubmit={handleModify}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </PageWrapper>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <strong>{label}:</strong>
    <div>{value}</div>
  </div>
);

export default ReservationDetailPage;
