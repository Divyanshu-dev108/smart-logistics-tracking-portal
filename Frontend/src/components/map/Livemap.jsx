import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const truckIcon = new Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/3082/3082037.png",
  iconSize: [38, 38],
});

const vehicles = [
  {
    id: 1,
    driver: "Rahul Sharma",
    position: [28.4595, 77.0266],
    speed: "62 km/h",
  },
  {
    id: 2,
    driver: "Raj Singh",
    position: [28.4705, 77.0300],
    speed: "48 km/h",
  },
];

export default function LiveMap() {
  return (
    <MapContainer
      center={[28.4595, 77.0266]}
      zoom={13}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={vehicle.position}
          icon={truckIcon}
        >
          <Popup>
            <b>{vehicle.driver}</b>

            <br />

            Speed : {vehicle.speed}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}