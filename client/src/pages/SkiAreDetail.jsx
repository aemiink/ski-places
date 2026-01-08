import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const SkiAreaDetail = () => {
  const { slug } = useParams();
  const [skiArea, setSkiArea] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchSkiArea = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/ski-areas/${slug}`);
      const data = res.data.data;

      setSkiArea(data);
      setLikesCount(data.likes?.length || 0);

      const userId = localStorage.getItem("userId");
      if (userId && data.likes) {
        setLiked(data.likes.includes(userId));
      }
    } catch {
      console.error("SkiArea not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkiArea();
  }, [slug]);

  const toggleLike = async () => {
    try {
      const res = await api.post(
        `/ski-areas/${skiArea._id}/like`
      );
      setLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
    } catch {
      alert("Beğenmek için giriş yapmalısınız");
    }
  };

  if (loading) return <p className="p-6">Yükleniyor...</p>;
  if (!skiArea) return <p className="p-6">Kayak yeri bulunamadı</p>;

  const images = skiArea.images || [];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* HERO */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-1">
            {skiArea.title}
          </h1>
          <p className="text-gray-500">
            📍 {skiArea.location}
          </p>
        </div>

        <button
          onClick={toggleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition
            ${
              liked
                ? "bg-red-100 text-red-600 border-red-300"
                : "bg-white text-gray-600"
            }`}
        >
          <Heart
            size={18}
            fill={liked ? "currentColor" : "none"}
          />
          {likesCount}
        </button>
      </div>

      {/* IMAGE SLIDER */}
      {images.length > 0 && (
        <div className="relative mb-10 rounded-lg overflow-hidden">
          <img
            src={images[currentImage]}
            alt={skiArea.title}
            className="w-full h-[420px] object-cover"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-3">
            Kayak Merkezi Hakkında
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {skiArea.description}
          </p>
        </div>


        <div className="bg-gray-50 border rounded-lg p-5 h-fit">
          <h3 className="font-semibold mb-3">
            Genel Bilgiler
          </h3>

          <ul className="text-sm text-gray-600 space-y-2">
            <li>📍 Konum: {skiArea.location}</li>
            <li>🗓️ Sezon: {skiArea.season}</li>
            <li>❤️ Beğeni: {likesCount}</li>
          </ul>
        </div>
      </div>


      <div className="mt-16">
        <CommentForm
          skiAreaId={skiArea._id}
          onSuccess={fetchSkiArea}
        />
        <CommentList skiAreaId={skiArea._id} />
      </div>
    </div>
  );
};

export default SkiAreaDetail;
