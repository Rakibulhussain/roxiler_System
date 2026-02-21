import { useState } from "react";
import axios from "axios";

export default function NewStore() {
  const [formData, setFormData] = useState({
    store_name: "",
    ownerId: "",
    address: "",
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

    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Add New Store</h2>

      <input
        name="store_name"
        placeholder="Store Name"
        onChange={handleChange}
      />

      <input
        name="ownerId"
        placeholder="Owner ID"
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Create Store</button>
    </div>
  );
}