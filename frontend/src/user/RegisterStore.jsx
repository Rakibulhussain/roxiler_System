import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserNavbar } from "./UserNavbar";

export const RegisterStore = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/store/all"
        );

        setStores(res.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return <div style={styles.center}>Loading stores...</div>;
  }

  return (

    <>
    <UserNavbar/>
    <div style={styles.page}>
      <h2 style={styles.title}>Available Stores</h2>

      <div style={styles.grid}>
        {stores.map((store) => (
          <div key={store.id} style={styles.card}>
            <h3 style={styles.storeName}>{store.store_name}</h3>

            <p style={styles.text}>
              📍 {store.address}
            </p>

            <p style={styles.text}>
              👤 Owner: {store.owner?.name}
            </p>

            <p style={styles.rating}>
              ⭐{" "}
              {store.averageRating
                ? Number(store.averageRating).toFixed(2)
                : "No Ratings"}
            </p>
          </div>
        ))}
      </div>

      {stores.length === 0 && (
        <p style={styles.empty}>No stores found.</p>
      )}
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

  title: {
    marginBottom: "30px",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  storeName: {
    marginBottom: "10px",
    color: "#4f46e5",
  },

  text: {
    fontSize: "14px",
    marginBottom: "8px",
  },

  rating: {
    fontWeight: "bold",
    color: "#f59e0b",
  },

  empty: {
    textAlign: "center",
    marginTop: "40px",
    color: "#6b7280",
  },

  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },
};