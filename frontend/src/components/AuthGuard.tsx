import { Navigate, Outlet } from "react-router-dom";

// 🛡️ PROTECTED: Only logged in users can enter
export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// 🔓 PUBLIC: Logged in users get kicked out of Login/Register back to Home
export const PublicRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : <Outlet />;
};
