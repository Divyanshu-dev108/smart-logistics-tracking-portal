import { Circle } from "lucide-react";

export default function SidebarFooter() {
  return (
    <div className="mt-auto border-t border-slate-800 p-5">
      <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-3">
        <div className="relative">
          <img
            src="https://ui-avatars.com/api/?name=Rajneesh&background=10b981&color=fff"
            alt="Profile"
            className="h-11 w-11 rounded-full"
          />

          <Circle
            size={10}
            fill="#22c55e"
            className="absolute bottom-0 right-0 text-emerald-400"
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            Rajneesh Kumar
          </h3>

          <p className="text-xs text-slate-400">
            Administrator
          </p>
        </div>
      </div>
    </div>
  );
}