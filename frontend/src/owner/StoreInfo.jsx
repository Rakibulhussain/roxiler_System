import React, { useEffect, useState } from "react";
import axios from "axios";

export const StoreInfo = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔥 Assuming owner has only 1 store
        const res = await axios.get(
          "http://localhost:5000/api/store/my-store",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setStore(res.data.store);
        }
      } catch (error) {
        console.error("Error fetching store:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  if (loading) {
    return <div style={styles.center}>Loading store...</div>;
  }

  if (!store) {
    return <div style={styles.center}>No Store Found</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{store.name}</h2>

        <div style={styles.section}>
          <p><strong>Address:</strong> {store.address}</p>
        </div>

        <div style={styles.section}>
          <h4>Owner Details</h4>
          <p><strong>Name:</strong> {store.owner?.name}</p>
          <p><strong>Email:</strong> {store.owner?.email}</p>
        </div>

        <div style={styles.section}>
          <h4>Rating Info</h4>
          <p>
            <strong>Average Rating:</strong>{" "}
            <span style={styles.rating}>⭐ {store.averageRating}</span>
          </p>
          <p>
            <strong>Total Ratings:</strong> {store.totalRatings}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    width: "420px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#4f46e5",
  },
  section: {
    marginBottom: "18px",
    fontSize: "15px",
    lineHeight: "1.8",
  },
  rating: {
    color: "#f59e0b",
    fontWeight: "bold",
  },
  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },
};