import type { LegInfo } from "./LegInfoType";
import type { RouteType } from "./RouteType";

export type TravelAction =
  | { type: "SET_ROUTE"; payload: RouteType }
  | { type: "SET_COORDS"; payload: {checkpoint: string; coords: {lat: number; lng: number;}}}
  | { type: "SET_TRAVEL_MODE"; payload: { travelMode: string};}
  | { type: "SET_TRAVEL_INFO"; payload: { legs: LegInfo[] } }
  | { type: "RESET" };
