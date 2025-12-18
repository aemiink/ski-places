import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-10 py-10 bg-slate-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
