import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

const roleOptions = [
  { value: "Administrator", label: "Administrator" },
  { value: "Staff", label: "Staff" },
  { value: "Patron", label: "Patron" },
];

const UserForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    password: "",
    role_name: initialData.role || "",
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
      <Input label="Email" type="email" value={form.email} onChange={set("email")} required />
      <Input label="Password" type="password" value={form.password} onChange={set("password")} required={!initialData.id} />
      <Input label="Role" type="select" value={form.role_name} onChange={set("role_name")} options={roleOptions} />
      <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
        <Button label="Cancel" variant="ghost" onClick={onCancel} type="button" />
        <Button label={loading ? "Saving..." : "Save"} variant="primary" type="submit" isLoading={loading} />
      </div>
    </form>
  );
};

export default UserForm;
