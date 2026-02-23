import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={style.page}>
      <div style={style.container}>
        <h1 style={style.title}>Register</h1>

        <input
          style={style.input}
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          style={style.input}
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          style={style.input}
          name="password"
          type="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          style={style.input}
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={handleChange}
        />

        <select
          style={style.input}
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="OWNER">OWNER</option>
        </select>

        <button
          style={{
            ...style.button,
            backgroundColor: isHover ? "#4338ca" : "#4f46e5",
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleRegister}
        >
          Register
        </button>

        <p style={style.text}>
          If you already registered,{" "}
          <Link to="/login" style={style.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

const style = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "350px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
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

  text: {
    fontSize: "14px",
    textAlign: "center",
  },

  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "bold",
  },
};