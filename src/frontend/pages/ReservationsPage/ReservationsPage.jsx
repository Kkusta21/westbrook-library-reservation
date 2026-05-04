import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useReservations from "../../hooks/useReservations";
import Table from "../../components/common/Table/Table";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Modal from "../../components/common/Modal/Modal";
import ReservationForm from "../../components/reservations/ReservationForm/ReservationForm";

const ReservationsPage = () => {
  const navigate = useNavigate();
  const {
    reservations,
    loading,
    error,
    createReservation,
  } = useReservations();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredReservations = useMemo(() => {
    return reservations.filter((r) =>
      r.patron_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [reservations, search]);

  const handleCreate = async (data) => {
    await createReservation(data);
    setIsModalOpen(false);
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Patron Name", accessor: "patron_name" },
    { header: "Resource", accessor: "resource_name" },
    { header: "Date", accessor: "reservation_date" },
    { header: "Start", accessor: "start_time" },
    { header: "End", accessor: "end_time" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <Badge label={row.status} />,
    },
  ];

  return (
    <PageWrapper title="Reservations">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <Input
          placeholder="Search by patron name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          label="New Reservation"
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {loading && <p>Loading reservations...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <Table
          data={filteredReservations}
          columns={columns}
          onRowClick={(row) => navigate(`/reservations/${row.id}`)}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ReservationForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </PageWrapper>
  );
};

export default ReservationsPage;
