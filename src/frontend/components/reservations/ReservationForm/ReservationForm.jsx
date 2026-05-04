import React, { useEffect, useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { getAll as getAllResources } from "../../../services/resource.service";

const ReservationForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patron_name: "",
    patron_email: "",
    patron_phone: "",
    resource_id: "",
    reservation_date: "",
    start_time: "",
    end_time: "",
    notes: "",
    ...initialData,
  });

  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getAllResources();
        setResources(data);
      } catch (err) {
        setError("Failed to load resources");
      }
    };
    fetchResources();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.patron_name || !formData.reservation_date || !formData.start_time || !formData.end_time) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.end_time <= formData.start_time) {
      setError("End time must be after start time.");
      return;
    }

    setError(null);
    onSubmit(formData);
  };

  const resourceOptions = resources.map((r) => ({
    value: r.id,
    label: r.name || r.resource_name || `Resource ${r.id}`,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Patron Name"
        name="patron_name"
        value={formData.patron_name}
        onChange={handleChange}
        required
      />

      <Input
        label="Patron Email"
        type="email"
        name="patron_email"
        value={formData.patron_email}
        onChange={handleChange}
      />

      <Input
        label="Patron Phone"
        name="patron_phone"
        value={formData.patron_phone}
        onChange={handleChange}
      />

      <Input
        label="Resource"
        type="select"
        name="resource_id"
        value={formData.resource_id}
        onChange={handleChange}
        options={resourceOptions}
      />

      <Input
        label="Reservation Date"
        type="date"
        name="reservation_date"
        value={formData.reservation_date}
        onChange={handleChange}
        required
      />

      <Input
        label="Start Time"
        type="time"
        name="start_time"
        value={formData.start_time}
        onChange={handleChange}
        required
      />

      <Input
        label="End Time"
        type="time"
        name="end_time"
        value={formData.end_time}
        onChange={handleChange}
        required
      />

      <Input
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Button label="Submit" type="submit" />
        <Button label="Cancel" variant="ghost" onClick={onCancel} type="button" />
      </div>
    </form>
  );
};

export default ReservationForm;
