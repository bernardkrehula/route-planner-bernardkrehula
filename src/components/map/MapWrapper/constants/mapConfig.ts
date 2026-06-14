import { RoutesApi } from "./routes-api";

const API_KEY: string = (globalThis.GOOGLE_MAPS_API_KEY ??
  import.meta.env.VITE_GOOGLE_MAPS_PLACES_API_KEY) as string;
export const apiClient = new RoutesApi(API_KEY);

export const mapOptions = {
  defaultCenter: { lat: 22, lng: 0 },
  defaultZoom: 3,
  gestureHandling: "greedy",
  disableDefaultUI: true,
};
export const appearance = {
  walkingPolylineColor: "#000",
  defaultPolylineColor: "#3189c7",
  stepMarkerFillColor: "#333333",
  stepMarkerBorderColor: "#000000",
};

export const routeOptions = {
  routingPreference: "ROUTING_PREFERENCE_UNSPECIFIED",
  computeAlternativeRoutes: false,
  units: "METRIC",
};