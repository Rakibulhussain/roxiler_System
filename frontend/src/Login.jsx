import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData
      );

      console.log(res.data);

      // ✅ Save token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ Get role from backend
      const role = res.data?.user?.role;

      // ✅ Save role (optional but useful)
      localStorage.setItem("role", role);

      // ✅ Role Based Navigation
    if (role === "ADMIN") {
  navigate("/admindashboard");
} 
else if (role === "OWNER") {
  navigate("/ownerDashboard");
} 
else {
  navigate("/normalUserdashboard");
}

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Not registered?{" "}
        <Link to="/">Register here</Link>
      </p>
    </div>
  );
}