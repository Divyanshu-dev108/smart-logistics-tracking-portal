import { drivers } from "../data/driverData";

const Drivers = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Drivers</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Driver
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">License</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="border-b">
                <td className="p-4">{driver.name}</td>
                <td className="p-4">{driver.phone}</td>
                <td className="p-4">{driver.license}</td>
                <td className="p-4">{driver.vehicle}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      driver.status === "Available"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                  >
                    {driver.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;