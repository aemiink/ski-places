import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  LogIn,
  LayoutDashboard,
  UserPlus,
  Menu,
  X,
  Heart,
  MessageCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getUserAvatar } from "../../utils/storage";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const avatar = getUserAvatar();

  const isHome = location.pathname === "/";
  const isAdminD = location.pathname.startsWith("/admin");
  const isSkiPlace = location.pathname.startsWith("/ski-areas");

  const [scrolled, setScrolled] = useState(isHome);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    setScrolled(!isHome);
    setMobileOpen(false);
  }, [location.pathname, isHome]);

  useEffect(() => {
    if (isSkiPlace) {
      setScrolled(true);
    }
  }, [isSkiPlace]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navBg = scrolled
    ? "bg-white shadow border-b"
    : "bg-transparent";

  const textColor = scrolled
    ? "text-gray-800"
    : "text-white";

  const adminClassName = isAdminD
    ? `top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`
    : `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`;
  
  const skiPlaceClassName = isSkiPlace
    ? `top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`
    : adminClassName;

  

  return (
    <nav
      className={skiPlaceClassName}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className={`text-xl font-bold transition ${textColor}`}
        >
          Ski Places 🇹🇷
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition
                ${
                  scrolled
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-white text-white hover:bg-white hover:text-gray-900"
                }`}
              >
                <LogIn size={18} />
                Giriş Yap
              </Link>

              <Link
                to="/register"
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition
                ${
                  scrolled
                    ? "border border-blue-600 text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <UserPlus size={18} />
                Kayıt Ol
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/favorites"
                className={`flex items-center gap-1 text-sm transition ${
                  scrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                <Heart size={16} />
                Beğendiklerim
              </Link>

              <Link
                to="/dashboard"
                className={`flex items-center gap-1 text-sm transition ${
                  scrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                <MessageCircle size={16} />
                Yorumlarım
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-1 text-sm transition ${
                    scrolled
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  <LayoutDashboard size={16} />
                  Admin
                </Link>
              )}

              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${
                  scrolled
                    ? "bg-gray-100"
                    : "bg-white/10 backdrop-blur"
                }`}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover border"
                />

                <div className="flex flex-col leading-tight">
                  <span
                    className={`text-sm font-semibold ${
                      scrolled
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                  >
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                  >
                    <LogOut size={14} />
                    Çıkış
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${textColor}`}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="px-6 py-4 space-y-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="block">
                  Giriş Yap
                </Link>
                <Link to="/register" className="block">
                  Kayıt Ol
                </Link>
              </>
            ) : (
              <>
                <Link to="/favorites" className="block">
                  ❤️ Beğendiklerim
                </Link>
                <Link to="/dashboard" className="block">
                  💬 Yorumlarım
                </Link>

                {isAdmin && (
                  <Link to="/admin" className="block">
                    🛠️ Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  Çıkış Yap
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
