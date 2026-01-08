import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import AdminLayout from "../components/layout/AdminLayout";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/admin/Dashboard";
import SkiAreas from "../pages/admin/SkiAreas";
import Comments from "../pages/admin/Comments";
import Profile from "../pages/admin/Profile"
import SkiAreaDetail from "../pages/SkiAreDetail";
import Favorites from "../pages/Favorites";
import { User } from "lucide-react";
import UserDashboard from "../pages/UserDashboard";



const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Navbar her sayfada */}
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
            path="/ski-areas/:slug"
            element={<SkiAreaDetail />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/dashboard" element={<UserDashboard />} />


        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="ski-areas" element={<SkiAreas />} />
          
          <Route path="comments" element={<Comments />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-gray-600">
              Sayfa bulunamadı
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
