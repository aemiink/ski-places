import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthComponents/AuthLayouts";
import { register } from "../api/auth.service";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const payload = {
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role: 0, // 🔴 ZORUNLU
    };

    await register(payload);
    navigate("/login");
  } catch (err) {
    console.log("REGISTER ERROR", err.response?.data);
    setError("Registration failed");
  }
};

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
        >
          Create Account
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-slate-900 font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
