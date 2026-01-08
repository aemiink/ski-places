import { useEffect, useState } from "react";
import api from "../api/axios";
import SkiAreaCard from "../components/Home/SkiAreaCard";
import WhySki from "../components/Home/WhySki";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/Home/HeroSection";


const Home = () => {
  const [skiAreas, setSkiAreas] = useState([]);

  const fetchSkiAreas = async () => {
    try {
      const res = await api.get("/ski-areas/skiareas");
      setSkiAreas(res.data.data);
    } catch {
      console.error("SkiAreas fetch error");
    }
  };

  useEffect(() => {
    fetchSkiAreas();
  }, []);

  const mostLiked = [...skiAreas]
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 3);

  return (
    <>
    <HeroSection />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8">
          Türkiye’nin En İyi Kayak Merkezleri
        </h1>

        {/* POPULAR */}
        {mostLiked.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              🔥 En Çok Beğenilenler
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {mostLiked.map((area) => (
                <SkiAreaCard key={area._id} area={area} />
              ))}
            </div>
          </>
        )}

        {/* ALL */}
        <h2 className="text-2xl font-semibold mb-4">
          Tüm Kayak Merkezleri
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {skiAreas.map((area) => (
            <SkiAreaCard key={area._id} area={area} />
          ))}
        </div>
      </div>

      <WhySki />
      <Footer />
    </>
  );
};

export default Home;
