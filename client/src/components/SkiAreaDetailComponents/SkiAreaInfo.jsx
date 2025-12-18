const SkiAreaInfo = ({ skiArea }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        {skiArea.name}
      </h1>
      <p className="text-slate-500">{skiArea.city}</p>

      <p className="mt-6 text-slate-700 leading-relaxed">
        {skiArea.description}
      </p>
    </div>
  );
};

export default SkiAreaInfo;
