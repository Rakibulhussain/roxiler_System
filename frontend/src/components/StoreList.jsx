import React, { useEffect, useState } from "react";
import axios from "axios";

export const StoreList = () => {
  const [stores, setStores] = useState([]);

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
    <div style={{ padding: "50px" }}>
      <h2>Store List</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Store Name</th>
            <th>Address</th>
            <th>Owner Name</th>
            <th>Owner Email</th>
            <th>Avg Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.store_name}</td>
              <td>{store.address}</td>
              <td>{store.owner?.name}</td>
              <td>{store.owner?.email}</td>
              <td>
                {store.avg_rating
                  ? Number(store.avg_rating).toFixed(2)
                  : "No Ratings"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "30px",
  },
};