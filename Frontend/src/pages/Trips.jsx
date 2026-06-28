import { trips } from "../data/tripData";

const Trips = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trips</h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Create Trip
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Trip ID</th>
              <th className="p-4 text-left">Source</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{trip.id}</td>
                <td className="p-4">{trip.source}</td>
                <td className="p-4">{trip.destination}</td>
                <td className="p-4">{trip.driver}</td>
                <td className="p-4">{trip.vehicle}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      trip.status === "Delivered"
                        ? "bg-green-500"
                        : trip.status === "In Transit"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {trip.status}
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

export default Trips;