import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const username = localStorage.getItem("admin_username");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome, {username}
        </h1>
        <p className="text-slate-500 text-sm">
          Admin Control Panel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Manage Ski Areas"
          description="Create, delete and upload photos for ski areas."
          to="/admin/ski-areas"
        />

        <DashboardCard
          title="Manage Comments"
          description="Review and delete user comments."
          to="/admin/comments"
        />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, description, to }) => {
  return (
    <Link
      to={to}
      className="bg-white p-6 rounded-xl shadow hover:shadow-md transition block"
    >
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-slate-500 mt-2">
        {description}
      </p>
    </Link>
  );
};

export default AdminDashboard;
