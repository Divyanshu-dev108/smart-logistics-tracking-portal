import { Circle } from "lucide-react";

export default function SidebarFooter() {
  return (
    <div className="border-t border-slate-800/60 p-4">
      <div className="flex items-center gap-3 rounded-xl bg-slate-800/40 p-3">
        <div className="relative shrink-0">
          <img
            src="https://ui-avatars.com/api/?name=Rajneesh&background=10b981&color=fff"
            alt="Profile"
            className="h-9 w-9 rounded-full"
          />
          <Circle
            size={8}
            fill="#22c55e"
            className="absolute bottom-0 right-0 text-emerald-400"
          />
        </div>

        <div className="min-w-0">
          <h3
            style={{ letterSpacing: "-0.02em" }}
            className="text-sm font-semibold text-white leading-none truncate"
          >
            Rajneesh Kumar
          </h3>
          <p className="text-[10px] font-medium tracking-widest uppercase text-slate-500 mt-0.5">
            Administrator
          </p>
        </div>
      </div>
    </div>
  );
}