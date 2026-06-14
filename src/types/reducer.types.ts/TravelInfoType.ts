import type { LegInfo } from "./LegInfoType";

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
  route: {
    legs: {
      distanceMeters: number;
      duration: string;
      staticDuration: string;
      polyline: {
        encodedPolyline: string;
      };
      startLocation: {
        latLng: {
          latitude: number;
          longitude: number;
        };
      };
      endLocation: {
        latLng: {
          latitude: number;
          longitude: number;
        };
      };
      steps: {
        distanceMeters: number;
        staticDuration: string;
        polyline: {
          encodedPolyline: string;
        };
        startLocation: {
          latLng: {
            latitude: number;
            longitude: number;
          };
        };
        endLocation: {
          latLng: {
            latitude: number;
            longitude: number;
          };
        };
        navigationInstruction: {
          maneuver: string;
          instructions: string;
        };
        localizedValues: {
          distance: { text: string };
          staticDuration: { text: string };
        };
        travelMode: string;
      }[];
      localizedValues: {
        distance: { text: string };
        duration: { text: string };
        staticDuration: { text: string };
      };
    }[];
    viewport: {
      low: {
        latitude: number;
        longitude: number;
      };
      high: {
        latitude: number;
        longitude: number;
      };
    };
    polylineDetails: Record<string, unknown>;
  };
  travelMode: string;
};
