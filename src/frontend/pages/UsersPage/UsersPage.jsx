import React, { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useUsers from "../../hooks/useUsers";
import Table from "../../components/common/Table/Table";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import UserForm from "../../components/users/UserForm/UserForm";

const UsersPage = () => {
  const { users, loading, error, createUser, deactivateUser } = useUsers();
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "is_active", label: "Active" },
  ];

  const handleSubmit = async (data) => {
    await createUser(data);
    setShowModal(false);
  };

  return (
    <PageWrapper title="User Management">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Button label="+ New User" variant="primary" onClick={() => setShowModal(true)} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table
        data={users}
        columns={columns}
        actions={(row) => (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Badge status={row.is_active ? "active" : "inactive"} />
            <Button label="Deactivate" variant="danger" onClick={() => deactivateUser(row.id)} />
          </div>
        )}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New User">
        <UserForm onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
    </PageWrapper>
  );
};

export default UsersPage;
