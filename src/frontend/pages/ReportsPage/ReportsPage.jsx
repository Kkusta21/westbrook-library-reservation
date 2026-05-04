import React, { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useReports from "../../hooks/useReports";
import Table from "../../components/common/Table/Table";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

const ReportsPage = () => {
  const {
    data,
    loading,
    error,
    fetchByPeriod,
    fetchByResource,
    fetchByLocation,
  } = useReports();

  const [activeTab, setActiveTab] = useState("period");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGeneratePeriod = async () => {
    if (!startDate || !endDate) return;
    await fetchByPeriod(startDate, endDate);
  };

  const renderPeriod = () => {
    const columns = [
      { header: "ID", accessor: "id" },
      { header: "Patron", accessor: "patron_name" },
      { header: "Resource", accessor: "resource_name" },
      { header: "Date", accessor: "reservation_date" },
      { header: "Status", accessor: "status" },
    ];

    return (
      <>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Input
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button
            label="Generate"
            variant="primary"
            onClick={handleGeneratePeriod}
          />
        </div>

        {data && Array.isArray(data) && (
          <Table data={data} columns={columns} />
        )}
      </>
    );
  };

  const renderResource = () => {
    const columns = [
      { header: "Resource", accessor: "resource_name" },
      { header: "Total Bookings", accessor: "total_bookings" },
    ];

    return (
      <>
        <Button
          label="Load"
          variant="primary"
          onClick={fetchByResource}
          style={{ marginBottom: "1rem" }}
        />
        {data && Array.isArray(data) && (
          <Table data={data} columns={columns} />
        )}
      </>
    );
  };

  const renderLocation = () => {
    const columns = [
      { header: "Location", accessor: "location_name" },
      { header: "Total Bookings", accessor: "total_bookings" },
    ];

    return (
      <>
        <Button
          label="Load"
          variant="primary"
          onClick={fetchByLocation}
          style={{ marginBottom: "1rem" }}
        />
        {data && Array.isArray(data) && (
          <Table data={data} columns={columns} />
        )}
      </>
    );
  };

  return (
    <PageWrapper title="Reports">
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <Button
          label="By Period"
          variant={activeTab === "period" ? "primary" : "ghost"}
          onClick={() => setActiveTab("period")}
        />
        <Button
          label="By Resource"
          variant={activeTab === "resource" ? "primary" : "ghost"}
          onClick={() => setActiveTab("resource")}
        />
        <Button
          label="By Location"
          variant={activeTab === "location" ? "primary" : "ghost"}
          onClick={() => setActiveTab("location")}
        />
      </div>

      {loading && <p>Loading report...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && activeTab === "period" && renderPeriod()}
      {!loading && activeTab === "resource" && renderResource()}
      {!loading && activeTab === "location" && renderLocation()}
    </PageWrapper>
  );
};

export default ReportsPage;
