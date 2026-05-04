import React, { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useUsers from "../../hooks/useUsers";
import Table from "../../components/common/Table/Table";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import UserForm from "../../components/users/UserForm/UserForm";

const UsersPage = () => {
  const {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deactivateUser,
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCreate = async (data) => {
    await createUser(data);
    setIsModalOpen(false);
  };

  const handleDeactivate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this user?"
    );
    if (!confirmed) return;

    await deactivateUser(id);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role_name" },
    {
      header: "Active",
      accessor: "active",
      render: (row) => (
        <Badge label={row.active === false ? "No" : "Yes"} />
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <Button
          label="Deactivate"
          variant="danger"
          type="button"
          onClick={() => handleDeactivate(row.id)}
        />
      ),
    },
  ];

  return (
    <PageWrapper title="User Management">
      <div style={{ marginBottom: "1.5rem" }}>
        <Button
          label="New User"
          variant="primary"
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
        />
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <Table data={users} columns={columns} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserForm
          initialData={selectedUser || {}}
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </PageWrapper>
  );
};

export default UsersPage;
