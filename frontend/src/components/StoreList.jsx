import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../admin/Navbar";

export const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/store/stores-with-details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStores(res.data.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  return (

    <>
    <Navbar />
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Store List</h2>

        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Store Name</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Owner Name</th>
              <th style={styles.th}>Owner Email</th>
              <th style={styles.th}>Avg Rating</th>
            </tr>
          </thead>

          <tbody>
            {stores.map((store, index) => (
              <tr
                key={store.id}
                style={{
                  ...styles.tr,
                  backgroundColor:
                    hoveredRow === index ? "#f3f4f6" : "#ffffff",
                }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.td}>{store.id}</td>
                <td style={styles.td}>{store.store_name}</td>
                <td style={styles.td}>{store.address}</td>
                <td style={styles.td}>{store.owner?.name}</td>
                <td style={styles.td}>{store.owner?.email}</td>
                <td style={styles.td}>
                  {store.avg_rating ? (
                    <span style={styles.rating}>
                      ⭐ {Number(store.avg_rating).toFixed(2)}
                    </span>
                  ) : (
                    <span style={styles.noRating}>No Ratings</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {stores.length === 0 && (
          <p style={styles.emptyText}>No stores found.</p>
        )}
      </div>
    </div>
    </>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  headerRow: {
    backgroundColor: "#4f46e5",
    color: "white",
  },

  th: {
    padding: "12px",
    textAlign: "left",
    fontSize: "14px",
  },

  tr: {
    transition: "0.2s",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
  },

  rating: {
    color: "#f59e0b",
    fontWeight: "bold",
  },

  noRating: {
    color: "#6b7280",
  },

  emptyText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#6b7280",
  },
};