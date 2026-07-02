import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;