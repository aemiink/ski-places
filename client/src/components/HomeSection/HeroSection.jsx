import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center bg-[url('https://idsb.tmgrup.com.tr/ly/uploads/images/2022/02/06/thumbs/800x531/180202.jpg?v=1644214193')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-3xl px-6 text-white">
        <h1 className="text-5xl font-extrabold leading-tight">
          Discover the Best Ski Destinations in Turkey
        </h1>

        <p className="mt-6 text-lg text-slate-200">
          Explore breathtaking mountains and unforgettable winter experiences.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/ski-areas")}
            className="px-6 cursor-pointer py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-200 transition"
          >
            Explore Ski Areas
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
