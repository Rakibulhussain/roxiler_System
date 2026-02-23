import React, { useEffect, useState } from "react";
import axios from "axios";

export const StoreTable = () => {
  const [stores, setStores] = useState([]);
  const [selectedRating, setSelectedRating] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/store/all"
        );
        setStores(res.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  const handleRatingChange = (storeId, rating) => {
    setSelectedRating({
      ...selectedRating,
      [storeId]: rating,
    });
  };

  const submitRating = async (storeId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/rating/rate",
        {
          storeId: storeId,
          rating: selectedRating[storeId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Rating failed"
      );
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>All Stores And Ratings</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Store</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Owner</th>
              <th style={styles.th}>Avg Rating</th>
              <th style={styles.th}>Your Rating</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {stores.map((store) => (
              <tr key={store.id} style={styles.row}>
                <td style={styles.td}>{store.store_name}</td>
                <td style={styles.td}>{store.address}</td>
                <td style={styles.td}>{store.owner?.name}</td>
                <td style={styles.td}>
                  {store.averageRating
                    ? `⭐ ${Number(store.averageRating).toFixed(2)}`
                    : "No Ratings"}
                </td>

                <td style={styles.td}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span
                      key={num}
                      style={{
                        ...styles.star,
                        color:
                          selectedRating[store.id] >= num
                            ? "#f59e0b"
                            : "#ccc",
                      }}
                      onClick={() =>
                        handleRatingChange(store.id, num)
                      }
                    >
                      ★
                    </span>
                  ))}
                </td>

                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onClick={() => submitRating(store.id)}
                    disabled={!selectedRating[store.id]}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && <p style={styles.message}>{message}</p>}
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

  title: {
    marginBottom: "20px",
  },

  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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

  star: {
    fontSize: "20px",
    cursor: "pointer",
    marginRight: "5px",
  },

  button: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },

  message: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "#16a34a",
  },
};