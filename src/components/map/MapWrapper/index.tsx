import "./index.css";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useReducer } from "react";
import RoutePannel from "../RoutePannel";
import Route from "./Route";
import { travelReducer } from "./travelReducer";
import { apiClient, appearance, mapOptions } from "./constants/mapConfig";

const ApiKey = import.meta.env.VITE_GOOGLE_MAPS_PLACES_API_KEY;

const MapWrapper = () => {
  const [state, dispatch] = useReducer(travelReducer, {
    legs: null,
    coordinates: {
      start: null,
      stop: null,
      end: null,
    },
    route: null,
    travelMode: "DRIVE",
  });

  return (
    <div className="map-wrapper">
      <APIProvider apiKey={ApiKey}>
        <RoutePannel state={state} dispatch={dispatch} />
        <Map className="map" mapId={"d10c35da7e1c69a696d8e796"} {...mapOptions}>
          <Route
            apiClient={apiClient}
            appearance={appearance}
            state={state}
            dispatch={dispatch}
          />
        </Map>
      </APIProvider>
    </div>
  );
};
export default MapWrapper;
