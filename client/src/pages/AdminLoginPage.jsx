import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/AxiosInstance";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const DEV_ADMIN = true;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (DEV_ADMIN) {
    // 🔥 MOCK ADMIN LOGIN
    localStorage.setItem("admin_token", "dev-admin-token");
    localStorage.setItem("admin_username", "admin");

    navigate("/admin");
    return;
  }

  // 🔒 REAL BACKEND LOGIN (sonra açılacak)
  try {
    const res = await api.post("/api/Auth/login", form);
    const { token, user } = res.data;

    if (user.role !== 1) {
      setError("Not an admin");
      return;
    }

    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_username", user.username);
    navigate("/admin");
  } catch {
    setError("Login failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-slate-900 text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm text-center text-slate-500">
          No admin account?{" "}
          <Link
            to="/admin/register"
            className="text-slate-900 font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLoginPage;
