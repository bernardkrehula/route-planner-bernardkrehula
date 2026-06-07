import "./index.css";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
  Pin,
  type MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useNavigate, useSearchParams } from "react-router";
import { parseRouteCoordinates } from "#/utils/mapHelper";
import { useEffect, useState } from "react";
import RoutePannel from "../RoutePannel";

const ApiKey = import.meta.env.VITE_GOOGLE_MAPS_PLACES_API_KEY;

const cords = {
  lat: 53.54992,
  lng: 10.00678,
};
const MapWrapper = ({ defaultCoords }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("");
  }, []);

  return (
    <div className="map-wrapper">
      <APIProvider apiKey={ApiKey}>
        <RoutePannel searchParams={searchParams} navigate={navigate} />
        <Map
          className="map"
          mapId={"d10c35da7e1c69a696d8e796"}
          defaultZoom={12}
          defaultCenter={cords}
        ></Map>
      </APIProvider>
    </div>
  );
};
export default MapWrapper;
