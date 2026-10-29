import Card from "../ui/Card";

export default function ChartContainer({ title, subtitle, action, children, className = "" }) {
  return (
    <Card className={`flex flex-col justify-between p-5 sm:p-6 min-w-0 w-full overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap min-w-0">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white font-sans tracking-tight truncate">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 font-normal mt-0.5 truncate">{subtitle}</p>}
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="flex-1 min-w-0 w-full">{children}</div>
    </Card>
  );
}