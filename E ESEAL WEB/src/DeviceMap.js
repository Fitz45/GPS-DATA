import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { database } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

// Fix default marker icon issue in Leaflet + Webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

export default function DeviceMap() {
  const [position, setPosition] = useState([6.5244, 3.3792]); // Default: Lagos, Nigeria

  useEffect(() => {
    const gpsRef = ref(database, "device/gps");
    const unsubscribe = onValue(gpsRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.lat && data.lng) {
        setPosition([data.lat, data.lng]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h3>Device Location</h3>
      <MapContainer center={position} zoom={15} style={{ height: 300, width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>Device Location<br />Lat: {position[0]}, Lng: {position[1]}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
