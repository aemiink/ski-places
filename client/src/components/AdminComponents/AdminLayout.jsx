import { Outlet, Link } from "react-router-dom";
import { adminLogout } from "../../utils/adminAuth";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-6 space-y-6">
        <h2 className="text-lg font-semibold">Admin Panel</h2>

        <nav className="space-y-3 text-sm">
          <Link to="/admin" className="block hover:text-slate-300">
            Dashboard
          </Link>
          <Link to="/admin/ski-areas" className="block hover:text-slate-300">
            Ski Areas
          </Link>
          <Link to="/admin/comments" className="block hover:text-slate-300">
            Comments
          </Link>
        </nav>

        <button
          onClick={adminLogout}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
