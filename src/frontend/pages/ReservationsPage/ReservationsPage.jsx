import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useReservations from "../../hooks/useReservations";
import Table from "../../components/common/Table/Table";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import ReservationForm from "../../components/reservations/ReservationForm/ReservationForm";

const ReservationsPage = () => {
  const { reservations, loading, error, createReservation } = useReservations();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const filtered = reservations.filter((r) =>
    r.patron_name?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", label: "ID" },
    { key: "patron_name", label: "Patron Name" },
    { key: "resource_name", label: "Resource" },
    { key: "reservation_date", label: "Date" },
    { key: "start_time", label: "Start" },
    { key: "end_time", label: "End" },
    { key: "status", label: "Status" },
  ];

  const handleSubmit = async (data) => {
    await createReservation(data);
    setShowModal(false);
  };

  return (
    <PageWrapper title="Reservations">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <input
          placeholder="Search by patron name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "4px", width: "300px" }}
        />
        <Button label="+ New Reservation" variant="primary" onClick={() => setShowModal(true)} />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Table
        data={filtered}
        columns={columns}
        onRowClick={(row) => navigate(`/reservations/${row.id}`)}
        actions={(row) => <Badge status={row.status} />}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Reservation">
        <ReservationForm onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
    </PageWrapper>
  );
};

export default ReservationsPage;
