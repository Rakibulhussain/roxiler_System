import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { Login } from "./Login";
import { Register } from "./Register";
import DashBoard from "./DashBoard";
import CreateUser from "./components/CreateUser";
import NewStore from "./components/NewStore";
import { NormalUserDashboard } from "./components/NormalUserDashboard";
import { OwnerDashboard } from "./components/OwnerDashboard";
import { StoreList } from "./components/StoreList";
import { AdminAndNormalUser } from "./components/AdminAndNormalUser";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route (Register Page) */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/redirect" replace /> : <Register />
          }
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/redirect" replace /> : <Login />
          }
        />

        {/* Role Based Redirect */}
        <Route
          path="/redirect"
          element={
            role === "ADMIN" ? (
              <Navigate to="/admindashboard" replace />
            ) : role === "OWNER" ? (
              <Navigate to="/ownerDashboard" replace />
            ) : (
              <Navigate to="/normalUserdashboard" replace />
            )
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        {/* Owner Dashboard */}
        <Route
          path="/ownerDashboard"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Normal User Dashboard */}
        <Route
          path="/normalUserdashboard"
          element={
            <ProtectedRoute>
              <NormalUserDashboard />
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

        <Route
          path="/storeList"
          element={
            <ProtectedRoute>
              <StoreList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminAndnormalUserList"
          element={
            <ProtectedRoute>
              <AdminAndNormalUser />
            </ProtectedRoute>
          }
        />


        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;