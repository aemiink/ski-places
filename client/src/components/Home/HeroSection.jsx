import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="relative h-[75vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1549880338-65ddcdfd017b)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-3xl text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Türkiye’nin En Güzel Kayak Merkezleri
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Kış tatilin için en iyi kayak merkezlerini keşfet,
          deneyimleri incele ve favorini seç.
        </p>

        <Link
          to="#kayak-merkezleri"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-full text-white font-medium"
        >
          Kayak Merkezlerini İncele
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
