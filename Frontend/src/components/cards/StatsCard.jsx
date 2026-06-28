import Card from "../ui/Card";

export default function StatsCard({
  title,
  value,
  change,
}) {
  return (
    <Card className="space-y-3">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white">
        {value}
      </h2>

      <span className="text-emerald-400 text-sm">
        {change} this month
      </span>

    </Card>
  );
}