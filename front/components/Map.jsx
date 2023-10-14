import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState } from "preact/hooks";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/images/markers-shadow.png",
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ estabelecimento }) {
  const [clickedLatLng, setClickedLatLng] = useState(null);

  function ClickHandler() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log(e.latlng);
        setClickedLatLng({ lat, lng });
      },
    });

    return null;
  }

  return (
    <MapContainer
      style={{ height: "220px", width: "100wh" }}
      center={
        estabelecimento.lat
          ? [estabelecimento.lat, estabelecimento.lon]
          : [-13.2399454992863, -51.67968750000001]
      }
      zoom={15}
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={false}
    >
      <ClickHandler />

      <TileLayer
        attribution="Google Maps"
        url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      <Marker
        position={
          estabelecimento.lat
            ? [estabelecimento.lat, estabelecimento.lon]
            : [-13.2399454992863, -51.67968750000001]
        }
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
