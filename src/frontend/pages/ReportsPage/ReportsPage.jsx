import React, { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useReports from "../../hooks/useReports";
import Table from "../../components/common/Table/Table";
import Button from "../../components/common/Button/Button";

const ReportsPage = () => {
  const { data, loading, fetchByPeriod, fetchByResource, fetchByLocation } = useReports();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeTab, setActiveTab] = useState("period");

  const tabStyle = (tab) => ({
    padding: "0.6rem 1.2rem",
    cursor: "pointer",
    borderBottom: activeTab === tab ? "3px solid #2563eb" : "3px solid transparent",
    fontWeight: activeTab === tab ? 700 : 400,
    color: activeTab === tab ? "#2563eb" : "#6b7280",
    background: "none",
    border: "none",
    borderBottom: activeTab === tab ? "3px solid #2563eb" : "3px solid transparent",
  });

  return (
    <PageWrapper title="Reports">
      <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid #e5e7eb", marginBottom: "1.5rem" }}>
        <button style={tabStyle("period")} onClick={() => setActiveTab("period")}>By Period</button>
        <button style={tabStyle("resource")} onClick={() => setActiveTab("resource")}>By Resource</button>
        <button style={tabStyle("location")} onClick={() => setActiveTab("location")}>By Location</button>
      </div>

      {activeTab === "period" && (
        <div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end", marginBottom: "1rem" }}>
            <div><label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Start Date</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }} /></div>
            <div><label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}>End Date</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ padding: "0.5rem", border: "1px solid #d1d5db", borderRadius: "4px" }} /></div>
            <Button label="Generate" variant="primary" onClick={() => fetchByPeriod(startDate, endDate)} />
          </div>
          {loading && <p>Loading...</p>}
          <Table data={data?.period || []} columns={[{ key: "id", label: "ID" }, { key: "patron_name", label: "Patron" }, { key: "reservation_date", label: "Date" }, { key: "status", label: "Status" }]} />
        </div>
      )}

      {activeTab === "resource" && (
        <div>
          <div style={{ marginBottom: "1rem" }}><Button label="Load Report" variant="primary" onClick={fetchByResource} /></div>
          {loading && <p>Loading...</p>}
          <Table data={data?.resource || []} columns={[{ key: "resource_name", label: "Resource" }, { key: "total_reservations", label: "Total Bookings" }]} />
        </div>
      )}

      {activeTab === "location" && (
        <div>
          <div style={{ marginBottom: "1rem" }}><Button label="Load Report" variant="primary" onClick={fetchByLocation} /></div>
          {loading && <p>Loading...</p>}
          <Table data={data?.location || []} columns={[{ key: "location_name", label: "Location" }, { key: "total_reservations", label: "Total Bookings" }]} />
        </div>
      )}
    </PageWrapper>
  );
};

export default ReportsPage;
