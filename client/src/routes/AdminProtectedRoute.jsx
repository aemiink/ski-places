import { Navigate, Outlet } from "react-router-dom";
import { isAdminLoggedIn } from "../utils/adminAuth";

const AdminProtectedRoute = () => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
