import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [comments, setComments] = useState([]);

  const fetchMyComments = async () => {
    try {
      const res = await api.get("/comments/my");
      setComments(res.data.data);
    } catch {
      toast.error("Yorumlar yüklenemedi");
    }
  };

  useEffect(() => {
    fetchMyComments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Yorumlarım
      </h1>

      {comments.length === 0 && (
        <p className="text-gray-500">
          Henüz yorum yapmadın.
        </p>
      )}

      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-white p-4 rounded shadow"
          >
            <Link
              to={`/ski-areas/${c.skiArea.slug}`}
              className="font-medium text-blue-600"
            >
              {c.skiArea.title}
            </Link>

            <p className="mt-2 text-gray-700">{c.text}</p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(c.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
