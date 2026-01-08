import { useEffect, useState } from "react";
import api from "../api/axios";
import SkiAreaCard from "../components/Home/SkiAreaCard";
import toast from "react-hot-toast";

const Favorites = () => {
  const [areas, setAreas] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/ski-areas/liked");
      setAreas(res.data.data);
    } catch {
      toast.error("Beğenilenler yüklenemedi");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        ❤️ Beğendiğim Kayak Merkezleri
      </h1>

      {areas.length === 0 && (
        <p className="text-gray-500">
          Henüz beğendiğin bir kayak merkezi yok.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {areas.map((area) => (
          <SkiAreaCard key={area._id} area={area} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
