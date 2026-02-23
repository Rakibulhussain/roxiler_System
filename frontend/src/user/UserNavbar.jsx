import React from "react";
import { Link } from "react-router-dom";

export const UserNavbar = () => {
  return (
    <div style={styles.navbar}>
      <Link to="/normalUserdashboard" style={styles.dashboard}>
          Dashboard
        </Link>
      <div style={styles.links}>
        <Link to="/stores" style={styles.link}>
          Stores
        </Link>
       
        
        <Link to="/user/profile" style={styles.link}>
          Profile
        </Link>
        
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          style={styles.logoutButton}
        >
          Logout
        </button>
        
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 20px",
    backgroundColor: "#4f46e5",
    color: "white",
  },
  dashboard: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    marginRight: "20px",
  },
 
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
};