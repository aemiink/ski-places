const ExperienceSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          A Complete Winter Experience
        </h2>
        <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
          Skiing in Turkey is more than just slopes. Enjoy luxury hotels,
          traditional cuisine, vibrant après-ski scenes and cultural heritage
          combined into one unforgettable journey.
        </p>

        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {["Skiing", "Snowboarding", "Après-Ski", "Mountain Hotels"].map(
            (item, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl text-slate-700 hover:bg-slate-900 hover:text-white font-medium"
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
