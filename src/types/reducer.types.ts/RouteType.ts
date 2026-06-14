export type RouteType = {
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