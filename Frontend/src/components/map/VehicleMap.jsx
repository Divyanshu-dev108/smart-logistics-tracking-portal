import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helper component to smoothly center/zoom on selected vehicle and invalidate sizing on mount
function MapController({ selectedVehicle }) {
  const map = useMap();

  useEffect(() => {
    // Invalidate size after container renders to prevent blank/grey map tiles
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (selectedVehicle && selectedVehicle.lat && selectedVehicle.lng) {
      map.flyTo([selectedVehicle.lat, selectedVehicle.lng], 9, {
        duration: 1.2,
      });
    }
  }, [selectedVehicle, map]);
  return null;
}

// Custom glowing HTML marker
const createVehicleIcon = (status) => {
  const isMoving = status === "Moving";
  const ringColor = isMoving ? "rgba(16, 185, 129, 0.4)" : "rgba(245, 158, 11, 0.4)";
  const dotColor = isMoving ? "#10b981" : "#f59e0b";

  return L.divIcon({
    className: "custom-vehicle-marker",
    html: `
      <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
        <span style="position: absolute; inset: 0; border-radius: 9999px; background: ${ringColor}; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="position: relative; width: 22px; height: 22px; border-radius: 9999px; background: #0f172a; border: 2px solid ${dotColor}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px ${dotColor};">
          <div style="width: 8px; height: 8px; border-radius: 9999px; background: ${dotColor};"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

export default function VehicleMap({ vehicles = [], selectedVehicle, onSelectVehicle }) {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-slate-800/80 z-0"
      style={{ minHeight: "520px", height: "100%", width: "100%" }}
    >
      <MapContainer
        center={[22.5, 78.5]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ minHeight: "520px", height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles-dark"
        />

        <MapController selectedVehicle={selectedVehicle} />

        {vehicles.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            icon={createVehicleIcon(v.status)}
            eventHandlers={{
              click: () => onSelectVehicle && onSelectVehicle(v),
            }}
          >
            <Popup>
              <div className="p-2 space-y-1.5 font-body">
                <div className="flex items-center justify-between gap-3 border-b border-slate-700/60 pb-1.5">
                  <span className="font-bold text-white font-display text-sm tracking-wide">
                    {v.number}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      v.status === "Moving"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  <span className="text-slate-500 font-medium">Driver:</span> {v.driver}
                </p>
                <p className="text-xs text-slate-300">
                  <span className="text-slate-500 font-medium">Speed:</span>{" "}
                  <span className="tabular-nums font-semibold text-emerald-400">{v.speed}</span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}