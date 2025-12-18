import { createBrowserRouter } from "react-router-dom";


import MainLayout from "../components/layout/MainLayouts";
import AdminLayout from "../components/AdminComponents/AdminLayout";


import Landing from "../pages/Landing";
import SkiAreasPage from "../pages/SkiAreasPage";
import SkiAreaDetailPage from "../pages/SkiAreaDetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// admin pages
import AdminPage from "../pages/AdminPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminRegisterPage from "../pages/AdminRegisterPage";
import SkiAreaManagement from "../pages/SkiAreaManagement";
import CommentManagement from "../pages/CommentManagement";

// protected routes
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";

const router = createBrowserRouter([
  // 🌍 PUBLIC SITE
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/ski-areas", element: <SkiAreasPage /> },
      { path: "/ski-areas/:id", element: <SkiAreaDetailPage /> },
    ],
  },

  // 👤 AUTH (PUBLIC)
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  // 🛡️ USER PROTECTED (şimdilik boş ama yapı hazır)
  {
    element: <ProtectedRoute />,
    children: [
      // ileride profile, favorites vs buraya
    ],
  },

  // 🔐 ADMIN AUTH (PUBLIC)
  { path: "/admin/login", element: <AdminLoginPage /> },
  { path: "/admin/register", element: <AdminRegisterPage /> },

  // 👑 ADMIN PANEL (PROTECTED)
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <AdminPage /> },
          { path: "/admin/ski-areas", element: <SkiAreaManagement /> },
          { path: "/admin/comments", element: <CommentManagement /> },
        ],
      },
    ],
  },
]);

export default router;
