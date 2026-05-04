import React, { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useAvailability from "../../hooks/useAvailability";
import Table from "../../components/common/Table/Table";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import ReservationForm from "../../components/reservations/ReservationForm/ReservationForm";
import { create } from "../../services/reservation.service";

const AvailabilityPage = () => {
  const { results, loading, checkAvailability } = useAvailability();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [locationId, setLocationId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleCheck = () => {
    checkAvailability(locationId, `${date}T${startTime}`, `${date}T${endTime}`);
  };

  const handleBook = async (data) => {
    await create({ ...data, resource_id: selectedResource.id });
    setShowModal(false);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "location", label: "Location" },
    { key: "capacity", label: "Capacity" },
  ];

  return (
    <PageWrapper title="Check Availability">
      <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div><label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }} /></div>
          <div><label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Start Time</label>
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={{ padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }} /></div>
          <div><label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}>End Time</label>
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={{ padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }} /></div>
          <Button label="Check Availability" variant="primary" onClick={handleCheck} />
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <Table
        data={results}
        columns={columns}
        actions={(row) => (
          <Button label="Book Now" variant="primary" onClick={() => { setSelectedResource(row); setShowModal(true); }} />
        )}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Reservation">
        <ReservationForm
          initialData={{ resource_id: selectedResource?.id, start_time: startTime, end_time: endTime, reservation_date: date }}
          onSubmit={handleBook}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </PageWrapper>
  );
};

export default AvailabilityPage;
