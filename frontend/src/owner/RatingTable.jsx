import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const RatingTable = () => {
  const { storeId } = useParams(); // 🔥 Dynamic storeId
  const [ratings, setRatings] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [average, setAverage] = useState("0.00");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/rating/store-ratings/${storeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRatings(res.data.ratings);
        setStoreInfo(res.data.store);
        setAverage(res.data.averageRating);
        setTotal(res.data.totalRatings);

      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchRatings();
    }
  }, [storeId]);

  if (loading) {
    return <div style={styles.center}>Loading ratings...</div>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Store Ratings</h2>

        {storeInfo && (
          <div style={styles.storeInfo}>
            <p><strong>Store:</strong> {storeInfo.name}</p>
            <p><strong>Address:</strong> {storeInfo.address}</p>
            <p><strong>Total Ratings:</strong> {total}</p>
            <p><strong>Average Rating:</strong> ⭐ {average}</p>
          </div>
        )}

        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {ratings.length > 0 ? (
              ratings.map((r) => (
                <tr key={r.id} style={styles.row}>
                  <td style={styles.td}>{r.user?.name}</td>
                  <td style={styles.td}>{r.user?.email}</td>
                  <td style={styles.td}>⭐ {r.rating}</td>
                  <td style={styles.td}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={styles.noData}>
                  No ratings yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    marginBottom: "20px",
  },

  storeInfo: {
    marginBottom: "20px",
    lineHeight: "1.8",
    fontSize: "14px",
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
  },

  row: {
    borderBottom: "1px solid #e5e7eb",
  },

  td: {
    padding: "12px",
  },

  noData: {
    textAlign: "center",
    padding: "20px",
  },

  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },
};