import { useState } from "react";
import { Search, Package, MapPin, Truck } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { trips } from "../../data/tripData";

const statusVariant = {
  Delivered: "success",
  "In Transit": "info",
  Pending: "warning",
};

export default function CustomerHome() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = trips.find(
      (t) => t.id.toLowerCase() === query.trim().toLowerCase()
    );
    setResult(found || null);
    setSearched(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Track Your Shipment</h1>
        <p className="text-slate-400 mt-2">
          Enter your trip ID to see live status.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSearch} className="flex gap-3">
          <Input
            placeholder="e.g. TR001"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search size={16} className="mr-2" />
            Track
          </Button>
        </form>
      </Card>

      {searched && (
        <Card>
          {result ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15">
                    <Package size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{result.id}</p>
                    <p className="text-xs text-slate-400">
                      {result.source} → {result.destination}
                    </p>
                  </div>
                </div>

                <Badge variant={statusVariant[result.status] || "info"}>
                  {result.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Truck size={16} className="text-slate-500" />
                  Vehicle {result.vehicle}
                </div>
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <MapPin size={16} className="text-slate-500" />
                  Driver: {result.driver}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-sm text-center py-4">
              No shipment found for "{query}". Check your trip ID and try again.
            </p>
          )}
        </Card>
      )}

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Shipments
        </h3>

        <div className="space-y-3">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between rounded-xl bg-slate-800/50 p-4"
            >
              <div>
                <p className="text-sm font-medium text-white">
                  {trip.id} • {trip.source} → {trip.destination}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Driver: {trip.driver}
                </p>
              </div>

              <Badge variant={statusVariant[trip.status] || "info"}>
                {trip.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}