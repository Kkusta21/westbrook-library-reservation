import React, { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useResources from "../../hooks/useResources";
import Table from "../../components/common/Table/Table";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import ResourceForm from "../../components/resources/ResourceForm/ResourceForm";

const ResourcesPage = () => {
  const {
    resources,
    loading,
    error,
    createResource,
    updateResource,
    deleteResource,
  } = useResources();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleCreate = async (data) => {
    await createResource(data);
    setIsModalOpen(false);
  };

  const handleUpdate = async (data) => {
    await updateResource(selectedResource.id, data);
    setIsModalOpen(false);
    setSelectedResource(null);
  };

  const handleDeactivate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this resource?"
    );
    if (!confirmed) return;

    await deleteResource(id);
  };

  const openEditModal = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "resource_type_id" },
    { header: "Location", accessor: "location_name" },
    { header: "Capacity", accessor: "capacity" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <Badge label={row.status || "Active"} />,
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            label="Edit"
            variant="primary"
            type="button"
            onClick={() => openEditModal(row)}
          />
          <Button
            label="Deactivate"
            variant="danger"
            type="button"
            onClick={() => handleDeactivate(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <PageWrapper title="Resources">
      <div style={{ marginBottom: "1.5rem" }}>
        <Button
          label="New Resource"
          variant="primary"
          onClick={() => {
            setSelectedResource(null);
            setIsModalOpen(true);
          }}
        />
      </div>

      {loading && <p>Loading resources...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <Table data={resources} columns={columns} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ResourceForm
          initialData={selectedResource || {}}
          onSubmit={selectedResource ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedResource(null);
          }}
        />
      </Modal>
    </PageWrapper>
  );
};

export default ResourcesPage;
