import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function SidebarItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink to={item.path}>
      {({ isActive }) => (
        <div
          className={clsx(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group cursor-pointer",
            isActive
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
              : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100"
          )}
        >
          <Icon
            size={17}
            className={clsx(
              "shrink-0 transition-colors",
              isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
            )}
          />
          <span className="text-sm font-medium">
            {item.title}
          </span>
        </div>
      )}
    </NavLink>
  );
}