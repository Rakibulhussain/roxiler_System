import React, { useEffect, useState } from "react";
import axios from "axios";

export const CountUser = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ FIXED
        setStats(res.data.data);

      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Total Users</h3>
        <h1>{stats.totalUsers}</h1>
      </div>

      <div style={styles.card}>
        <h3>Total Stores</h3>
        <h1>{stats.totalStores}</h1>
      </div>

      <div style={styles.card}>
        <h3>Total Ratings</h3>
        <h1>{stats.totalRatings}</h1>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    padding: "20px",
    background: "#1e293b",
    color: "white",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center",
  },
};