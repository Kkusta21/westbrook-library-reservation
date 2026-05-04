import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

const typeOptions = [
  { value: "Study Room", label: "Study Room" },
  { value: "Meeting Hall", label: "Meeting Hall" },
  { value: "Projector", label: "Projector" },
  { value: "Laptop", label: "Laptop" },
  { value: "Equipment", label: "Equipment" },
];

const ResourceForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    resource_type_id: initialData.resource_type_id || "",
    location_id: initialData.location_id || "",
    capacity: initialData.capacity || "",
  });
  const [loading, setLoading] = useState(false);
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(form); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Name" value={form.name} onChange={set("name")} required />
      <Input label="Description" value={form.description} onChange={set("description")} />
      <Input label="Type" type="select" value={form.resource_type_id} onChange={set("resource_type_id")} options={typeOptions} />
      <Input label="Location ID" value={form.location_id} onChange={set("location_id")} />
      <Input label="Capacity" type="number" value={form.capacity} onChange={set("capacity")} />
      <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
        <Button label="Cancel" variant="ghost" onClick={onCancel} type="button" />
        <Button label={loading ? "Saving..." : "Save"} variant="primary" type="submit" isLoading={loading} />
      </div>
    </form>
  );
};

export default ResourceForm;
