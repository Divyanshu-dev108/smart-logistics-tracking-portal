import PixelCard from "./ui/PixelCard";

const colorToVariant = {
  emerald: "emerald",
  blue: "blue",
  yellow: "yellow",
  pink: "pink",
  purple: "purple",
};

const DashboardCard = ({ title, value, color = "emerald", variant }) => {
  const chosenVariant = variant || colorToVariant[color] || "pink";

  return (
    <PixelCard variant={chosenVariant} className="p-6">
      <div className="relative z-10">
        <h2 className="text-lg font-medium text-slate-300">{title}</h2>
        <h1 className="text-4xl font-bold mt-3 text-white tracking-tight">
          {value}
        </h1>
      </div>
    </PixelCard>
  );
};

export default DashboardCard;