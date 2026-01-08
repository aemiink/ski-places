import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useState } from "react";
import toast from "react-hot-toast";

const SkiAreaCard = ({ area }) => {
  const [likes, setLikes] = useState(area.likes?.length || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const res = await api.post(`/ski-areas/${area._id}/like`);
      setLikes(res.data.likesCount);
      setLiked(res.data.liked);
    } catch {
      toast.error("Beğenmek için giriş yapmalısın");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <Link to={`/ski-areas/${area.slug}`}>
        <img
          src={area.images[0]}
          alt={area.title}
          className="h-48 w-full object-cover"
        />
      </Link>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{area.title}</h3>

        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin size={14} />
          {area.location}
        </p>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 ${
              liked ? "text-red-500" : "text-gray-400"
            }`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            {likes}
          </button>

          <span className="text-xs text-gray-400">
            Sezon: {area.season}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkiAreaCard;
