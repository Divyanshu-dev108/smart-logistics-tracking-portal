import { Circle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function SidebarFooter() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="border-t border-slate-800/80 p-3.5">
      <div className="flex items-center gap-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-2.5 backdrop-blur-md">
        <div className="relative shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=1e293b&color=10b981&bold=true`}
            alt="Profile"
            className="h-9 w-9 rounded-xl object-cover ring-1 ring-emerald-500/30 bg-slate-800"
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-slate-900" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3
            style={{ letterSpacing: "-0.02em" }}
            className="text-xs font-semibold text-white leading-none truncate font-display"
          >
            {user?.name || "User"}
          </h3>
          <p className="text-[10px] font-mono font-medium uppercase text-emerald-400/90 mt-1 leading-none truncate">
            {user?.role || "Admin"} • Live
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0 cursor-pointer"
          title="Sign Out"
        >
          <LogOut size={15} />
        </button>
      </div>
    </div>
  );
}