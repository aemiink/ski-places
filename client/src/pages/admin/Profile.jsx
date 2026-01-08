import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const { user, setUser } = useAuth();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.put("/user/profile", {
        username,
        email,
        password: password || undefined
      });

      setUser(res.data.data);
      toast.success("Profil güncellendi ✅");
      setPassword("");
    } catch (error) {
      toast.error("Profil güncellenemedi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">👤 Profilim</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded-md"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı adı"
        />

        <input
          type="email"
          className="w-full border px-4 py-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full border px-4 py-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Yeni Şifre (opsiyonel)"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Kaydediliyor..." : "Güncelle"}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
