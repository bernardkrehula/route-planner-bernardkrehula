import "./index.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";
import { useState } from "react";
import { requestRoute } from "#/api/requestRoute";

const MapWrapper = () => {
  const [cordinates, setCordinates] = useState([
    [46.334298, 16.273321],
    [46.305979, 16.335594],
  ]);
  const customIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [38, 38],
  });

  const limeOptions = { color: "lime" };

  const tileLayerOptions = {
    attribution: "stamen open street",
    url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.jpg",
  } as any;
  const handleCordinates = async () => {
    await requestRoute();
  };

  return (
    <div className="map-wrapper">
      <MapContainer center={[46.31, 16.34]} zoom={12}>
        {/*  <TileLayer {...tileLayerOptions} /> */}
        <TileLayer {...tileLayerOptions} />
        <MarkerClusterGroup>
          {cordinates.map((marker, key) => (
            <Marker
              key={key}
              position={marker.geocode}
              {...({ icon: customIcon } as any)}
            >
              {/* <Popup>{marker.popUp}</Popup> */}
            </Marker>
          ))}
        </MarkerClusterGroup>
        <Polyline pathOptions={limeOptions} positions={cordinates} />
      </MapContainer>
    </div>
  );
};
export default MapWrapper;
