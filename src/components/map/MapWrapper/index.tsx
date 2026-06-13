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
import { useEffect, useReducer, useState } from "react";
import RoutePannel from "../RoutePannel";
import Route from "#/testFolder/components/route";
import { RoutesApi } from "#/testFolder/routes-api";

const ApiKey = import.meta.env.VITE_GOOGLE_MAPS_PLACES_API_KEY;

const mapOptions = {
  defaultCenter: { lat: 22, lng: 0 },
  defaultZoom: 3,
  gestureHandling: "greedy",
  disableDefaultUI: true,
};
const appearance = {
  walkingPolylineColor: "#000",
  defaultPolylineColor: "#3189c7",
  stepMarkerFillColor: "#333333",
  stepMarkerBorderColor: "#000000",
};

const routeOptions = {
  routingPreference: "ROUTING_PREFERENCE_UNSPECIFIED",
  computeAlternativeRoutes: false,
  units: "METRIC",
};
const API_KEY: string = (globalThis.GOOGLE_MAPS_API_KEY ??
  import.meta.env.VITE_GOOGLE_MAPS_PLACES_API_KEY) as string;
const apiClient = new RoutesApi(API_KEY);

type TravelInfo = {
  duration: string | null;
  distance: number | null;
}

type TravelAction = 
  | { type: "SET_TRAVEL_INFO"; payload: { duration: string; distance: number } }
  | { type: "RESET" }

const travelReducer = (state: TravelInfo, action: TravelAction): TravelInfo => {
  switch (action.type) {
    case "SET_TRAVEL_INFO":
      if (state.duration === action.payload.duration && 
          state.distance === action.payload.distance) return state;
      return { ...state, ...action.payload };
    case "RESET":
      return { duration: null, distance: null };
    default:
      return state;
  }
}

const MapWrapper = () => {
  const [coordinates, setCoordinates] = useState({
    start: null,
    stop: null,
    end: null,
  });
  const [travelMode, setTravelMode] = useState({ travelMode: "DRIVE" });
  const [state, dispatch] = useReducer(travelReducer, {
    duration: null,
    distance: null
  })

  const rawRouteOptions = {...routeOptions, ...travelMode}

  return (
    <div className="map-wrapper">
      <APIProvider apiKey={ApiKey}>
        <RoutePannel
          setCoordinates={setCoordinates}
          setTravelMode={setTravelMode}
          state={state}
        />
        <Map className="map" mapId={"d10c35da7e1c69a696d8e796"} {...mapOptions}>
          <Route
            apiClient={apiClient}
            routeOptions={rawRouteOptions}
            appearance={appearance}
            {...coordinates}
            travelMode={travelMode}
            dispatch={dispatch}
          />
        </Map>
      </APIProvider>
    </div>
  );
};
export default MapWrapper;
