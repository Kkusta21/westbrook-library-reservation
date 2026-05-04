import React, { useEffect, useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useAvailability from "../../hooks/useAvailability";
import useReservations from "../../hooks/useReservations";
import Table from "../../components/common/Table/Table";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import Modal from "../../components/common/Modal/Modal";
import ReservationForm from "../../components/reservations/ReservationForm/ReservationForm";
import api from "../../services/api";

const AvailabilityPage = () => {
  const { results, loading, error, checkAvailability } = useAvailability();
  const { createReservation } = useReservations();

  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get("/api/locations");
        setLocations(response.data);
      } catch (err) {
        console.error("Failed to load locations");
      }
    };
    fetchLocations();
  }, []);

  const handleCheck = async () => {
    if (!locationId || !date || !startTime || !endTime) return;

    await checkAvailability(locationId, `${date} ${startTime}`, `${date} ${endTime}`);
  };

  const handleBook = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleCreateReservation = async (data) => {
    await createReservation(data);
    setIsModalOpen(false);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "resource_type_id" },
    { header: "Location", accessor: "location_name" },
    { header: "Capacity", accessor: "capacity" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <Button
          label="Book Now"
          variant="primary"
          type="button"
          onClick={() => handleBook(row)}
        />
      ),
    },
  ];

  const locationOptions = locations.map((loc) => ({
    value: loc.id,
    label: loc.name || loc.location_name,
  }));

  return (
    <PageWrapper title="Check Availability">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <Input
          type="select"
          label="Location"
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          options={locationOptions}
        />

        <Input
          type="date"
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Input
          type="time"
          label="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <Input
          type="time"
          label="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <Button
          label="Check Availability"
          variant="primary"
          onClick={handleCheck}
        />
      </div>

      {loading && <p>Checking availability...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && results && (
        <Table data={results} columns={columns} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ReservationForm
          initialData={{
            resource_id: selectedResource?.id,
            reservation_date: date,
            start_time: startTime,
            end_time: endTime,
          }}
          onSubmit={handleCreateReservation}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </PageWrapper>
  );
};

export default AvailabilityPage;
