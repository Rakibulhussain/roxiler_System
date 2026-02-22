import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../App.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchClick = async () => {
    if (!search.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/users/search?search=${search}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate("/adminAndnormalUserList", {
        state: { searchResults: res.data.data }
      });

    } catch (error) {
      console.error("Search error:", error.response?.data || error.message);
    }
  };

  return (
    <nav style={styles.nav}>
      {/* LEFT SIDE */}
      <div style={styles.leftSection}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/createNewUser" style={styles.link}>Create User</Link>
        <Link to="/createStore" style={styles.link}>Create Store</Link>
        <Link to="/storeList" style={styles.link}>Store List</Link>
        <Link to="/adminAndnormalUserList" style={styles.link}>
          Users
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.rightSection}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSearchClick} style={styles.searchBtn}>
          Search
        </button>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "12px 30px",
    background: "#1f1f1f",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap"
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500
  },

  input: {
    padding: "7px 10px",
    width: "200px",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#2a2a2a",
    color: "white",
    outline: "none"
  },

  searchBtn: {
    padding: "7px 14px",
    background: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px"
  },

  logoutBtn: {
    padding: "7px 14px",
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px"
  }
};