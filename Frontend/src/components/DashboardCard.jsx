const DashboardCard = ({ title, value, color }) => {
  return (
    <div
      className={`${color} text-white rounded-xl p-6 shadow-lg hover:scale-105 duration-300`}
    >
      <h2 className="text-lg">{title}</h2>

      <h1 className="text-4xl font-bold mt-3">
        {value}
      </h1>
    </div>
  );
};

export default DashboardCard;