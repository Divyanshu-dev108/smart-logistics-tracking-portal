import { useRef, useState } from "react";

const dotColor = {
  success: { dot: "bg-emerald-400", ping: "bg-emerald-400", shadow: "shadow-[0_0_8px_rgba(16,185,129,0.6)]" },
  info: { dot: "bg-blue-400", ping: "bg-blue-400", shadow: "shadow-[0_0_8px_rgba(59,130,246,0.6)]" },
  warning: { dot: "bg-amber-400", ping: "bg-amber-400", shadow: "shadow-[0_0_8px_rgba(245,158,11,0.6)]" },
};

export default function ActivityCard({ text, time, type = "info" }) {
  const itemRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const theme = dotColor[type] || dotColor.info;

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-3.5 py-3 px-3.5 rounded-xl transition-all duration-200 min-w-0 group hover:bg-slate-800/30 overflow-hidden cursor-default"
    >
      {/* ReactBits Spotlight Tracking Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-200"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${cursor.x}px ${cursor.y}px, rgba(16, 185, 129, 0.12), transparent 70%)`,
        }}
      />



      <div className="flex-1 min-w-0 relative z-10">
        <p className="text-xs sm:text-sm text-slate-200 break-words group-hover:text-white transition-colors">
          {text}
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5 font-mono truncate">{time}</p>
      </div>
    </div>
  );
}