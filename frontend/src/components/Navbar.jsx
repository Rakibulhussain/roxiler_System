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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/adminAndnormalUserList", {
        state: { searchResults: res.data.data },
      });

    } catch (error) {
      console.error("Search error:", error.response?.data || error.message);
    }
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/createNewUser" style={styles.link}>Create User</Link>
        <Link to="/createStore" style={styles.link}>Create Store</Link>
        <Link to="/storeList" style={styles.link}>Store List</Link>
        <Link to="/adminAndnormalUserList" style={styles.link}>
          Admin & Normal User List
        </Link>
      </div>

      <div style={styles.rightSection}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSearchClick} style={styles.searchBtn}>
          Search
        </button>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "12px 25px",
    background: "#222",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box"
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  link: {
    marginRight: "18px",
    color: "white",
    textDecoration: "none"
  },

  input: {
    padding: "6px 8px",
    width: "180px",
    borderRadius: "4px",
    border: "none",
    fontSize: "14px"
  },

  searchBtn: {
    padding: "5px 10px",
    fontSize: "13px",
    background: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },

  button: {
    padding: "5px 10px",
    fontSize: "13px",
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};