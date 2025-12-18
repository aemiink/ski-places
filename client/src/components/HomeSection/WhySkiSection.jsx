const features = [
  {
    title: "World-Class Slopes",
    desc: "Modern lifts, long runs and professional piste maintenance.",
  },
  {
    title: "Affordable Luxury",
    desc: "High-quality ski resorts at a fraction of European prices.",
  },
  {
    title: "Stunning Landscapes",
    desc: "Ski with breathtaking views of Anatolia’s mountains.",
  },
];

const WhySkiSection = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Why Ski in Turkey?
        </h2>
        <p className="mt-4 text-slate-600">
          Discover what makes Turkey a hidden gem for winter sports.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <div key={i} className="bg-white hover:bg-slate-900 text-slate-800 hover:text-white hover:transition p-8 rounded-xl shadow-sm transition">
              <h3 className="text-xl font-semibold ">
                {item.title}
              </h3>
              <p className="mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySkiSection;
