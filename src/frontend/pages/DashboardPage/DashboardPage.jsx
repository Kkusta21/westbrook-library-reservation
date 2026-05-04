import React from "react";
import PageWrapper from "../../components/layout/PageWrapper/PageWrapper";
import useReservations from "../../hooks/useReservations";
import Table from "../../components/common/Table/Table";
import Badge from "../../components/common/Badge/Badge";

const DashboardPage = () => {
  const { reservations, loading } = useReservations();

  const total = reservations.length;
  const confirmed = reservations.filter(
    (r) => r.status === "Confirmed"
  ).length;
  const pending = reservations.filter(
    (r) => r.status === "Pending"
  ).length;
  const cancelled = reservations.filter(
    (r) => r.status === "Cancelled"
  ).length;

  const recentReservations = [...reservations]
    .sort((a, b) => new Date(b.reservation_date) - new Date(a.reservation_date))
    .slice(0, 5);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Patron", accessor: "patron_name" },
    { header: "Resource", accessor: "resource_name" },
    { header: "Date", accessor: "reservation_date" },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <Badge label={row.status} />,
    },
  ];

  return (
    <PageWrapper title="Dashboard">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <StatCard title="Total Reservations" value={total} />
            <StatCard title="Confirmed" value={confirmed} />
            <StatCard title="Pending" value={pending} />
            <StatCard title="Cancelled" value={cancelled} />
          </div>

          <h3 style={{ marginBottom: "1rem" }}>
            Recent Reservations
          </h3>

          <Table data={recentReservations} columns={columns} />
        </>
      )}
    </PageWrapper>
  );
};

const StatCard = ({ title, value }) => (
  <div
    style={{
      padding: "1.5rem",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      textAlign: "center",
    }}
  >
    <h4 style={{ marginBottom: "0.5rem" }}>{title}</h4>
    <p style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{value}</p>
  </div>
);

export default DashboardPage;
