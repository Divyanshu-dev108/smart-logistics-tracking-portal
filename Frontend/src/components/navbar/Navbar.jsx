import { Bell, Search, UserCircle2 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-20 bg-slate-950 border-b border-slate-800 px-8 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-400">
          Welcome back, Admin 👋
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-slate-800 rounded-xl px-4 py-2">

          <Search size={18} />

          <input
            className="bg-transparent ml-2 outline-none"
            placeholder="Search..."
          />

        </div>

        <Bell />

        <UserCircle2 size={35} />

      </div>
    </header>
  );
};

export default Navbar;