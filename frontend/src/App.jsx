import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { Login } from "./Login";
import { Register } from "./Register";
import DashBoard from "./DashBoard";
import CreateUser from "./components/CreateUser";
import NewStore from "./components/NewStore";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/" replace /> : <Login />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            token ? <Navigate to="/" replace /> : <Register />
          }
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        {/* Create User */}
        <Route
          path="/createNewUser"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />

        {/* Create Store */}
        <Route
          path="/createStore"
          element={
            <ProtectedRoute>
              <NewStore />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;