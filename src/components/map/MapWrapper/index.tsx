import "./index.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";
import { useNavigate, useSearchParams } from "react-router";
import { parseRouteCoordinates } from "#/utils/mapHelper";
import { useEffect, useState } from "react";
import { requestRoute } from "#/api/requestRoute";
import { timeCalculator } from "#/utils/timeCalculator";
import { distanceCalculator } from "#/utils/distanceCalculator";
import RoutePannel from "../RoutePannel";

const MapWrapper = ({ defaultCoords }) => {
  const [travelRoute, setTravelRoute] = useState([[0, 0]]);
  const [travelInfo, setTravelInfo] = useState({
    distance: "0",
    duration: "0",
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("");
  }, []);

  const startParam = searchParams.get("start");
  const endParams = searchParams.get("end");
  const cords = parseRouteCoordinates(startParam, endParams);
  const customIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [38, 38],
  });
  console.log(travelInfo);
  const limeOptions = { color: "lime" };
  const tileLayerOptions = {
    attribution: "stamen open street",
    url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.jpg",
  } as any;

  const calculateTravelRoute = async (cords, travelOption) => {
    const response = await requestRoute(cords, travelOption);
    const rawCoordinates = response.geometry.coordinates;
    const leafletReadyRoute = rawCoordinates.map(([lng, lat]) => [lat, lng]);
    const info = response.properties.summary;
    const duration = timeCalculator(info.duration);
    const distance = distanceCalculator(info.distance);
    const infoAboutTravel = { duration, distance };
    setTravelInfo(infoAboutTravel);
    setTravelRoute(leafletReadyRoute);
  };

  return (
    <div className="map-wrapper">
      <RoutePannel calculateTravelRoute={calculateTravelRoute} navigate={navigate} searchParams={searchParams}/>
      <MapContainer {...({ center: defaultCoords, zoom: 12 } as any)}>
        <TileLayer {...tileLayerOptions} />
        <MarkerClusterGroup>
          {cords.map((marker, key) => {
            return (
              <Marker
                key={key}
                position={marker}
                {...({ icon: customIcon } as any)}
              >
                <Popup>
                  <span>Duration: {travelInfo.duration}</span>
                  <span>Distance: {travelInfo.distance}</span>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
        <Polyline pathOptions={limeOptions} positions={travelRoute} />
      </MapContainer>
    </div>
  );
};
export default MapWrapper;
