import { Search, X } from "lucide-react";
import AnimatedTabs from "../ui/AnimatedTabs";

export default function FilterBar({
  search = "",
  onSearchChange,
  placeholder = "Search...",
  filters = [],
  activeFilter = "all",
  onFilterChange,
  totalCount,
  filteredCount,
  className = "",
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0 w-full ${className}`}>
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md min-w-0">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 sm:h-11 pl-10 pr-10 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-body shadow-inner backdrop-blur-md"
        />
        {search && (
          <button
            onClick={() => onSearchChange && onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Tabs & Count */}
      <div className="flex items-center gap-3 flex-wrap min-w-0">
        {filters.length > 0 && (
          <AnimatedTabs
            tabs={filters}
            activeTab={activeFilter}
            onChange={onFilterChange}
            size="sm"
          />
        )}

        {totalCount !== undefined && (
          <div className="text-xs text-slate-400 font-mono whitespace-nowrap pl-1 tabular-nums shrink-0">
            {filteredCount !== undefined ? `${filteredCount} / ${totalCount}` : totalCount}{" "}
            records
          </div>
        )}
      </div>
    </div>
  );
}
