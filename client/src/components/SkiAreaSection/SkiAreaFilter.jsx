const SkiAreaFilter = ({ search, setSearch, city, setCity, cities }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search ski area..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full md:w-1/2"
      />

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full md:w-1/4"
      >
        <option value="">All Cities</option>
        {cities.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SkiAreaFilter;
