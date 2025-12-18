import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
  };

  return (
    <nav className="h-16 px-10 flex items-center justify-between bg-slate-900 text-white">
      <h2 className="text-lg font-semibold">Ski Places of Turkey</h2>

      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="hover:text-slate-300 transition">
          Home
        </Link>
        <Link to="/ski-areas" className="hover:text-slate-300 transition">
          Ski Areas
        </Link>

        {!username ? (
          <Link to="/login" className="hover:text-slate-300 transition">
            Login
          </Link>
        ) : (
          <div className="relative group">
            <button className="font-medium hover:text-slate-300 transition">
              {username}
            </button>

            {/* DROPDOWN */}
            <div className="absolute right-0 mt-2 w-32 bg-white text-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
