import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../admin/Navbar";

export const AdminAndNormalUser = () => {
  const [users, setUsers] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/users/admin_normal_user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (

    <>
    <Navbar/>
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin & Normal Users</h2>

        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                style={{
                  ...styles.tr,
                  backgroundColor:
                    hoveredRow === index ? "#f3f4f6" : "#ffffff",
                }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.address}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      color:
                        user.role === "ADMIN" ? "#dc2626" : "#16a34a",
                      fontWeight: "bold",
                    }}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p style={styles.emptyText}>No users found.</p>
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

  emptyText: {
    marginTop: "20px",
    textAlign: "center",
    color: "#6b7280",
  },
};