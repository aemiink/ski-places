const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            About Ski Places of Turkey
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Turkey offers a unique skiing experience with its diverse geography and high-quality ski resorts.
            From the legendary slopes of Uludağ to the long alpine runs of Palandöken, Ski Places of Turkey
            helps you discover the best winter destinations.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Our platform brings together detailed information, real user experiences and up-to-date resort data
            to make your next winter adventure unforgettable.
          </p>
        </div>

        <img
          src="https://greekreporter.com/wp-content/uploads/2017/12/kalavryta-credit-facebook-calavryta-ski-resort-768x512.jpg"
          alt="Skiing"
          className="rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default AboutSection;
