import SkiAreaCard from "../ui/SkiAreaCard";

const SkiAreaList = ({ data }) => {
  if (data.length === 0) {
    return (
      <p className="text-center text-slate-500">
        No ski areas found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((area) => (
        <SkiAreaCard
          key={area.id}
          name={area.name}
          city={area.city}
          description={area.description}
        />
      ))}
    </div>
  );
};

export default SkiAreaList;
