import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#222", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px", color: "white" }}>
        Dashboard
      </Link>

      <Link to="/createNewUser" style={{ marginRight: "15px", color: "white" }}>
        Create User
      </Link>

      <Link to="/createStore" style={{ marginRight: "15px", color: "white" }}>
        Create Store
      </Link>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}