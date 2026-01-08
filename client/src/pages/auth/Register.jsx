import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Tüm alanlar zorunlu");
      return;
    }

    try {
      await api.post("/auth/register", {
        username,
        email,
        password
      });

      toast.success("Kayıt başarılı 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Kayıt başarısız"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Kayıt Ol
        </h1>

        <input
          placeholder="Kullanıcı Adı"
          className="w-full border px-4 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Şifre"
          type="password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default Register;
