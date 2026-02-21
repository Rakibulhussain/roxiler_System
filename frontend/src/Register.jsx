import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

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

      // ✅ Go to login after register
      navigate("/login");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h1>Register Page</h1>

      <input
        name="name"
        value={formData.name}
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        value={formData.email}
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        value={formData.password}
        placeholder="Password"
        onChange={handleChange}
      />

      <input
        name="address"
        value={formData.address}
        placeholder="Address"
        onChange={handleChange}
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
        <option value="OWNER">OWNER</option>
      </select>

      <button onClick={handleRegister}>Register</button>

      <p>
        If you already registered,{" "}
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}