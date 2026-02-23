import React, { useEffect, useState } from "react";
import axios from "axios";
import { OwnerNavbar } from "./OwnerNavbar";

export const OwnerProfile = () => {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [hover, setHover] = useState(false);

  // 🔹 Fetch Owner Profile
  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Optional: ensure role is OWNER
        if (res.data.data.role !== "OWNER") {
          setMessage("Access denied. Not an owner.");
        } else {
          setOwner(res.data.data);
        }

      } catch (error) {
        console.error("Error fetching owner profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, []);

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/users/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
      setPasswordData({ oldPassword: "", newPassword: "" });

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Password change failed"
      );
    }
  };

  if (loading) {
    return <div style={styles.center}>Loading profile...</div>;
  }

  return (

    <>

    <OwnerNavbar/>
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Owner Profile</h2>

        {owner && (
          <div style={styles.infoBox}>
            <p><strong>Name:</strong> {owner.name}</p>
            <p><strong>Email:</strong> {owner.email}</p>
            <p><strong>Address:</strong> {owner.address}</p>
          </div>
        )}

        <hr style={{ margin: "20px 0" }} />

        <h3>Change Password</h3>

        <form onSubmit={handlePasswordChange} style={styles.form}>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              backgroundColor: hover ? "#4338ca" : "#4f46e5",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Update Password
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
    </>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "420px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  infoBox: {
    fontSize: "14px",
    lineHeight: "1.8",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    transition: "0.3s",
  },

  message: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#16a34a",
    textAlign: "center",
  },

  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },
};