import React, { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useResources from "../../hooks/useResources";
import Table from "../../components/common/Table/Table";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import ResourceForm from "../../components/resources/ResourceForm/ResourceForm";

const ResourcesPage = () => {
  const { resources, loading, error, createResource, updateResource, deleteResource } = useResources();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "location", label: "Location" },
    { key: "capacity", label: "Capacity" },
    { key: "status", label: "Status" },
  ];

  const handleSubmit = async (data) => {
    if (editData) {
      await updateResource(editData.id, data);
    } else {
      await createResource(data);
    }
    setShowModal(false);
    setEditData(null);
  };

  return (
    <PageWrapper title="Resources">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Button label="+ New Resource" variant="primary" onClick={() => { setEditData(null); setShowModal(true); }} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table
        data={resources}
        columns={columns}
        actions={(row) => (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Badge status={row.status || "active"} />
            <Button label="Edit" variant="ghost" onClick={() => { setEditData(row); setShowModal(true); }} />
            <Button label="Deactivate" variant="danger" onClick={() => deleteResource(row.id)} />
          </div>
        )}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editData ? "Edit Resource" : "New Resource"}>
        <ResourceForm initialData={editData} onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
    </PageWrapper>
  );
};

export default ResourcesPage;
