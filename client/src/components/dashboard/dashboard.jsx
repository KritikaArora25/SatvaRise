// Dashboard.jsx
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { getDailyAnalytics } from "../api.js";
import { mockDailyAnalytics } from "../MockAnalytics.js";

// 🔁 Toggle mock vs real API
const USE_MOCK = true;

const COLORS = ["#6B8E23", "#B22222"];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        if (USE_MOCK) {
          setData(mockDailyAnalytics);
          setLoading(false);
          return;
        }

        const userId = localStorage.getItem("userId");
        const res = await getDailyAnalytics(userId);
        setData(res);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load analytics", err);
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;
  }

  if (!data || data.totalPauses === 0) {
    return (
      <p style={{ textAlign: "center" }}>
        No pauses recorded today. Stay mindful 🌱
      </p>
    );
  }

  const pieData = [
    { name: "Won", value: data.won },
    { name: "Indulged", value: data.indulged }
  ];

  const barData = Object.entries(data.byHour).map(
    ([hour, count]) => ({
      hour: `${hour}:00`,
      count
    })
  );

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Daily Summary</h2>

      {/* Stats Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "30px"
        }}
      >
        <Stat label="Total Pauses" value={data.totalPauses} />
        <Stat label="Won" value={data.won} />
        <Stat label="Indulged" value={data.indulged} />
      </div>

      {/* Charts */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "40px"
        }}
      >
        {/* Pie Chart */}
        <div style={{ textAlign: "center" }}>
          <h3>Outcome</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div style={{ textAlign: "center" }}>
          <h3>Pauses by Hour</h3>
          <BarChart width={400} height={300} data={barData}>
            <XAxis dataKey="hour" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      style={{
        padding: "16px 24px",
        borderRadius: "10px",
        background: "#f4f4f4",
        minWidth: "140px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
      }}
    >
      <strong style={{ fontSize: "22px" }}>{value}</strong>
      <p style={{ margin: "6px 0 0" }}>{label}</p>
    </div>
  );
}
