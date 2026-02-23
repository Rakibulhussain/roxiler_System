import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";

import DashBoard from "./admin/DashBoard";
import {OwnerDashboard }from "./owner/OwnerDashboard";
import { NormalUserDashboard } from "./user/NormalUserDashboard";

import CreateUser from "./components/CreateUser";
import NewStore from "./components/NewStore";
import { StoreList } from "./components/StoreList";
import { AdminAndNormalUser } from "./components/AdminAndNormalUser";
import UserProfile from "./user/UserProfile";
import { RegisterStore } from "./user/RegisterStore";
import { OwnerProfile } from "./owner/OwnerProfile";
import { StoreInfo } from "./owner/StoreInfo";


/* ---------------- Protected Route ---------------- */

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* ---------------- App Component ---------------- */

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
 

  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route → Always go to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            token && role ? (
              <Navigate to="/redirect" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={
            token && role ? (
              <Navigate to="/redirect" replace />
            ) : (
              <Register />
            )
          }
        />

        {/* Role Based Redirect */}
        <Route
          path="/redirect"
          element={
            !token ? (
              <Navigate to="/login" replace />
            ) : role === "ADMIN" ? (
              <Navigate to="/admindashboard" replace />
            ) : role === "OWNER" ? (
              <Navigate to="/ownerDashboard" replace />
            ) : role === "USER" ? (
              <Navigate to="/normalUserdashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ---------------- Dashboards ---------------- */}

        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ownerDashboard"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/normalUserdashboard"
          element={
            <ProtectedRoute>
              <NormalUserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ---------------- Other Protected Routes ---------------- */}

        <Route
          path="/createNewUser"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />

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
    
    <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
       

       <Route
       path="/stores"
       element={
        <ProtectedRoute>
          <RegisterStore />
        </ProtectedRoute>
       }
       />

       <Route
       path="/owner/profile"
       element={
        <ProtectedRoute>
          <OwnerProfile />
        </ProtectedRoute>
       }
       />

       <Route
       path="/storeinfo"
        element={
          <ProtectedRoute>
            <StoreInfo />
          </ProtectedRoute>
        }
       />
   
      

        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;