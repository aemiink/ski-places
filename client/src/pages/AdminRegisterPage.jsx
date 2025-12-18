import { useState } from "react";
import api from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const AdminRegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/api/Auth/register", {
      ...form,
      role: 1, 
    });

    navigate("/admin/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-lg shadow space-y-4 w-96">
        <h1 className="text-xl font-semibold">Admin Register</h1>

        {Object.keys(form).map((k) => (
          <input
            key={k}
            placeholder={k}
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, [k]: e.target.value })
            }
          />
        ))}

        <button className="bg-slate-900 text-white w-full py-2 rounded">
          Register
        </button>
      </div>
    </form>
  );
};

export default AdminRegisterPage;
