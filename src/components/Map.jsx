import L from "leaflet";

import icon from "/images/icon-location.svg";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useRef, useEffect } from "react";

export default function CityMap({ cord = [51.505, -0.09] }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(cord, 15);
      // Example coordinates and zoom level

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // custom icon
      let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
      });

      L.Marker.prototype.options.icon = DefaultIcon;

      markerRef.current = L.marker(cord).addTo(mapRef.current);
    }

    return () => {
      // Clean up the map instance when the component unmounts
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  return <div id="map"></div>;
}
