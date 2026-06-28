const dotColor = {
  success: "bg-emerald-400",
  info: "bg-blue-400",
  warning: "bg-yellow-400",
};

export default function ActivityCard({ text, time, type }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <span className={`mt-1.5 h-2 w-2 rounded-full ${dotColor[type]}`} />

      <div className="flex-1">
        <p className="text-sm text-slate-200">{text}</p>
        <p className="text-xs text-slate-500 mt-0.5">{time}</p>
      </div>
    </div>
  );
}