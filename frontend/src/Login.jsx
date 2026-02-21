import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData
      );

      console.log(res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ Redirect to dashboard route "/"
      navigate("/");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Register,{" "}
        <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}