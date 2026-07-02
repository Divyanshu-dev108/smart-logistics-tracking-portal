import Card from "../ui/Card";

export default function ChartContainer({ title, subtitle, action, children, className = "" }) {
  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>

        {action}
      </div>

      {children}
    </Card>
  );
}