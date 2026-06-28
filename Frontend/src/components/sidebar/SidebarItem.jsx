import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function SidebarItem({

    item

}) {

    const Icon = item.icon;

    return (

        <NavLink

            to={item.path}

            className={({ isActive }) =>

                clsx(

                    "group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300",

                    isActive

                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"

                        : "text-slate-400 hover:bg-slate-800 hover:text-white"

                )

            }

        >

            <Icon size={20} />

            <span className="font-medium">

                {item.title}

            </span>

        </NavLink>

    );

}