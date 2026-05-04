import React from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useReservations from "../../hooks/useReservations";
import Table from "../../components/common/Table/Table";
import Badge from "../../components/common/Badge/Badge";

const DashboardPage = () => {
  const { reservations, loading } = useReservations();

  const total = reservations.length;
  const confirmed = reservations.filter((r) => r.status === "Confirmed").length;
  const pending = reservations.filter((r) => r.status === "Pending").length;
  const cancelled = reservations.filter((r) => r.status === "Cancelled").length;

  const recentReservations = [...reservations]
    .sort((a, b) => new Date(b.reservation_date) - new Date(a.reservation_date))
    .slice(0, 5);

  const columns = [
    { key: "id", label: "ID" },
    { key: "patron_name", label: "Patron" },
    { key: "resource_name", label: "Resource" },
    { key: "reservation_date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <PageWrapper title="Dashboard">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}>
            <StatCard title="Total Reservations" value={total} color="#2563eb" />
            <StatCard title="Confirmed" value={confirmed} color="#16a34a" />
            <StatCard title="Pending" value={pending} color="#eab308" />
            <StatCard title="Cancelled" value={cancelled} color="#dc2626" />
          </div>
          <h3 style={{ marginBottom: "1rem" }}>Recent Reservations</h3>
          <Table
            data={recentReservations}
            columns={columns}
            actions={(row) => <Badge status={row.status} />}
          />
        </>
      )}
    </PageWrapper>
  );
};

const StatCard = ({ title, value, color }) => (
  <div style={{
    padding: "1.5rem",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    textAlign: "center",
    borderTop: `4px solid ${color}`,
  }}>
    <h4 style={{ marginBottom: "0.5rem", color: "#6b7280", fontSize: "0.85rem", fontWeight: 500 }}>{title}</h4>
    <p style={{ fontSize: "2rem", fontWeight: "bold", color }}>{value}</p>
  </div>
);

export default DashboardPage;
