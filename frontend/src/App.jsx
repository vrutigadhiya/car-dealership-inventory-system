import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Invalid URL */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
