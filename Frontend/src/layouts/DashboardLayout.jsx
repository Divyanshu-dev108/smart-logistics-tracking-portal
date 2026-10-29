import Navbar from "../components/navbar/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />

      <main className="flex-1 overflow-y-auto bg-slate-900 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;