import { useState } from "react";
import axios from "axios";
import Navbar from "../admin/Navbar";

export default function NewStore() {
  const [formData, setFormData] = useState({
    store_name: "",
    ownerId: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/store/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Store Created Successfully");
      console.log(res.data);

      // Reset form
      setFormData({
        store_name: "",
        ownerId: "",
        address: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Add New Store</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            name="store_name"
            placeholder="Store Name"
            value={formData.store_name}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="ownerId"
            placeholder="Owner ID"
            value={formData.ownerId}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading
                ? "#a5b4fc"
                : hover
                ? "#4338ca"
                : "#4f46e5",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {loading ? "Creating..." : "Create Store"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    width: "400px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
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
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
  },
};