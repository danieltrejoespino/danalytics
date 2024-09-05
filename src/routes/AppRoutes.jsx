import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from "../pages/Signup/Signin";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" />} />
    <Route path="/login" element={<Signin />} />
    <Route path="/signup" element={<Signin />} /> {/* new */}
    <Route path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
