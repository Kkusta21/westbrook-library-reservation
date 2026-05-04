import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import ReservationForm from "../../components/reservations/ReservationForm/ReservationForm";
import { getById, cancel, update } from "../../services/reservation.service";

const ReservationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getById(id).then((data) => {
      setReservation(data?.data || data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (window.confirm("Cancel this reservation?")) {
      await cancel(id);
      navigate("/reservations");
    }
  };

  const handleUpdate = async (data) => {
    const updated = await update(id, data);
    setReservation(updated?.data || updated);
    setShowModal(false);
  };

  if (loading) return <PageWrapper title="Reservation Detail"><p>Loading...</p></PageWrapper>;
  if (!reservation) return <PageWrapper title="Reservation Detail"><p>Not found.</p></PageWrapper>;

  const field = (label, value) => (
    <div style={{ marginBottom: "1rem" }}>
      <strong style={{ display: "block", fontSize: "0.85rem", color: "#6b7280" }}>{label}</strong>
      <span>{value || "—"}</span>
    </div>
  );

  return (
    <PageWrapper title="Reservation Detail">
      <div style={{ background: "#fff", borderRadius: "8px", padding: "2rem", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", maxWidth: "700px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {field("ID", reservation.id)}
          {field("Status", "")}
          <div><strong style={{ display: "block", fontSize: "0.85rem", color: "#6b7280" }}>Status</strong><Badge status={reservation.status} /></div>
          {field("Patron Name", reservation.patron_name)}
          {field("Patron Email", reservation.patron_email)}
          {field("Patron Phone", reservation.patron_phone)}
          {field("Resource", reservation.resource_name)}
          {field("Date", reservation.reservation_date)}
          {field("Start Time", reservation.start_time)}
          {field("End Time", reservation.end_time)}
          {field("Notes", reservation.notes)}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button label="Modify" variant="ghost" onClick={() => setShowModal(true)} />
          <Button label="Cancel Reservation" variant="danger" onClick={handleCancel} />
          <Button label="← Back" variant="ghost" onClick={() => navigate("/reservations")} />
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Modify Reservation">
        <ReservationForm initialData={reservation} onSubmit={handleUpdate} onCancel={() => setShowModal(false)} />
      </Modal>
    </PageWrapper>
  );
};

export default ReservationDetailPage;
