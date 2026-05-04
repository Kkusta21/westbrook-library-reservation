import React, { useEffect, useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import api from "../../../services/api";

const RESOURCE_TYPES = [
  { value: "Study Room", label: "Study Room" },
  { value: "Meeting Hall", label: "Meeting Hall" },
  { value: "Projector", label: "Projector" },
  { value: "Laptop", label: "Laptop" },
  { value: "Equipment", label: "Equipment" },
];

const ResourceForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    resource_type_id: "",
    location_id: "",
    capacity: "",
    ...initialData,
  });

  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get("/api/locations");
        setLocations(response.data);
      } catch (err) {
        setError("Failed to load locations");
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      setError("Name is required.");
      return;
    }

    setError(null);
    onSubmit({
      ...formData,
      capacity: formData.capacity ? Number(formData.capacity) : null,
    });
  };

  const locationOptions = locations.map((loc) => ({
    value: loc.id,
    label: loc.name || loc.location_name || `Location ${loc.id}`,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <Input
        label="Resource Type"
        type="select"
        name="resource_type_id"
        value={formData.resource_type_id}
        onChange={handleChange}
        options={RESOURCE_TYPES}
      />

      <Input
        label="Location"
        type="select"
        name="location_id"
        value={formData.location_id}
        onChange={handleChange}
        options={locationOptions}
      />

      <Input
        label="Capacity"
        type="number"
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Button label="Submit" type="submit" />
        <Button
          label="Cancel"
          variant="ghost"
          type="button"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default ResourceForm;
