import { useEffect, useState } from "react";
import { getSkiAreas } from "../api/skiArea.service";
import SkiAreaFilter from "../components/SkiAreaSection/SkiAreaFilter";
import SkiAreaList from "../components/SkiAreaSection/SkiAreaList";

const SkiAreasPage = () => {
  const [skiAreas, setSkiAreas] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    getSkiAreas().then((res) => {
      setSkiAreas(res.data);
    });
  }, []);

  const cities = [...new Set(skiAreas.map((s) => s.city))];

  const filteredData = skiAreas.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCity = city ? item.city === city : true;

    return matchesSearch && matchesCity;
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Ski Areas
      </h1>

      <SkiAreaFilter
        search={search}
        setSearch={setSearch}
        city={city}
        setCity={setCity}
        cities={cities}
      />

      <SkiAreaList data={filteredData} />
    </section>
  );
};

export default SkiAreasPage;
