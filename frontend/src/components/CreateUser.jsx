import { useState } from "react";
import axios from "axios";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/admin/create-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Created Successfully");
      console.log(res.data);

    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Create User</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />

      <select name="role" onChange={handleChange}>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
        <option value="OWNER">OWNER</option>
      </select>

      <button onClick={handleSubmit}>Create User</button>
    </div>
  );
}