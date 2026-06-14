import type { LegInfo } from "./LegInfoType";
import type { RouteType } from "./RouteType";

export type TravelInfo = {
  legs: LegInfo[];
  coordinates: {
    start: null | {
      lat: number;
      lng: number;
    };
    stop: null | {
      lat: number;
      lng: number;
    };
    end: null | {
      lat: number;
      lng: number;
    };
  };
  route: RouteType;
  travelMode: string;
};
