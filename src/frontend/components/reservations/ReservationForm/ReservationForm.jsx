import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

const ReservationForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    patron_name: initialData.patron_name || "",
    patron_email: initialData.patron_email || "",
    patron_phone: initialData.patron_phone || "",
    resource_id: initialData.resource_id || "",
    reservation_date: initialData.reservation_date || "",
    start_time: initialData.start_time || "",
    end_time: initialData.end_time || "",
    notes: initialData.notes || "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.start_time >= form.end_time) {
      setError("End time must be after start time.");
      return;
    }
    try {
      setLoading(true);
      await onSubmit(form);
    } catch (err) {
      setError(err.message || "Failed to save reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Patron Name" value={form.patron_name} onChange={set("patron_name")} required />
      <Input label="Patron Email" type="email" value={form.patron_email} onChange={set("patron_email")} />
      <Input label="Patron Phone" value={form.patron_phone} onChange={set("patron_phone")} />
      <Input label="Resource ID" value={form.resource_id} onChange={set("resource_id")} required />
      <Input label="Date" type="date" value={form.reservation_date} onChange={set("reservation_date")} required />
      <Input label="Start Time" type="time" value={form.start_time} onChange={set("start_time")} required />
      <Input label="End Time" type="time" value={form.end_time} onChange={set("end_time")} required />
      <Input label="Notes" value={form.notes} onChange={set("notes")} />
      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
        <Button label="Cancel" variant="ghost" onClick={onCancel} type="button" />
        <Button label={loading ? "Saving..." : "Save"} variant="primary" type="submit" isLoading={loading} />
      </div>
    </form>
  );
};

export default ReservationForm;
