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
  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      const role = res.data?.user?.role;
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admindashboard");
      } else if (role === "OWNER") {
        navigate("/ownerDashboard");
      } else {
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
    <div style={style.page}>
      <div style={style.container}>
        <h1 style={style.title}>Login</h1>

        <form onSubmit={handleLogin} style={style.form}>
          <input
            style={style.input}
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <input
            style={style.input}
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              ...style.button,
              backgroundColor: loading
                ? "#a5b4fc"
                : hover
                ? "#4338ca"
                : "#4f46e5"
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={style.text}>
          Not registered?{" "}
          <Link to="/register" style={style.link}>
            Register here
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
    fontFamily: "Arial, sans-serif"
  },

  container: {
    width: "350px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  title: {
    textAlign: "center",
    margin: 0
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s"
  },

  text: {
    fontSize: "14px",
    textAlign: "center"
  },

  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "bold"
  }
};