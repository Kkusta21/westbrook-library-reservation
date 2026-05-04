import React, { useState } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";

const ROLE_OPTIONS = [
  { value: "Administrator", label: "Administrator" },
  { value: "Staff", label: "Staff" },
  { value: "Patron", label: "Patron" },
];

const UserForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_name: "",
    ...initialData,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError("Name and email are required.");
      return;
    }

    if (!isEditMode && !formData.password) {
      setError("Password is required for new users.");
      return;
    }

    setError(null);

    const submitData = { ...formData };

    if (isEditMode && !submitData.password) {
      delete submitData.password;
    }

    onSubmit(submitData);
  };

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
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required={!isEditMode}
      />

      <Input
        label="Role"
        type="select"
        name="role_name"
        value={formData.role_name}
        onChange={handleChange}
        options={ROLE_OPTIONS}
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

export default UserForm;
