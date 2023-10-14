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

export default function MapaModal({ clickedLatLng, setClickedLatLng, nome }) {
  function ClickHandler() {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log(e.latlng);
        setClickedLatLng([lat, lng]);
      },
    });

    return null;
  }

  return (
    <MapContainer
      style={{ height: "420px", width: "100wh" }}
      center={clickedLatLng}
      zoom={4}
      zoomControl={true}
      scrollWheelZoom={true}
      dragging={true}
    >
      <ClickHandler />

      <TileLayer
        attribution="Google Maps"
        url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      <Marker position={clickedLatLng}>
        <Popup>{nome}</Popup>
      </Marker>
    </MapContainer>
  );
}
