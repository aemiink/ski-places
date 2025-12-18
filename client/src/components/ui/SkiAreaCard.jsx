import { useNavigate } from "react-router-dom";

const SkiAreaCard = ({ id, name, city, description }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/ski-areas/${id}`)}
      className="cursor-pointer border rounded-xl p-6 bg-white hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-slate-500">{city}</p>
      <p className="mt-3 text-sm text-slate-600 line-clamp-3">
        {description}
      </p>
    </div>
  );
};

export default SkiAreaCard;
