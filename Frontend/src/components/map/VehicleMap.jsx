import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon not showing in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function VehicleMap({ vehicles }) {
  return (
    <MapContainer
      center={[23.5, 78]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", borderRadius: "16px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {vehicles.map((v) => (
        <Marker key={v.id} position={[v.lat, v.lng]}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{v.number}</p>
              <p>Driver: {v.driver}</p>
              <p>Status: {v.status}</p>
              <p>Speed: {v.speed}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}