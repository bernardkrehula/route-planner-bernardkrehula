import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useMap,
} from "@vis.gl/react-google-maps";

import { Polyline } from "./polyline";
import { RoutesApi } from "../routes-api";

const defaultAppearance = {
  walkingPolylineColor: "#000000",
  defaultPolylineColor: "#9a1e45",
  stepMarkerFillColor: "#333333",
  stepMarkerBorderColor: "#000000",
};

type Appearance = typeof defaultAppearance;

export type RouteProps = {
  apiClient: RoutesApi;
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  routeOptions?: any;
  stop: { lat: number; lng: number };
  appearance?: Partial<Appearance>;
};

const Route = (props: RouteProps) => {
  const { apiClient, start, end, stop, routeOptions } = props;

  const [route, setRoute] = useState<any>(null);
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if(start === null || end === null) return;
    console.log(start, end)
    apiClient
      .computeRoutes(start, end, stop, routeOptions)
      .then((res) => {
        const [route] = res.routes;
        setRoute(route);

        const { high, low } = route.viewport;
        const bounds: google.maps.LatLngBoundsLiteral = {
          north: high.latitude,
          south: low.latitude,
          east: high.longitude,
          west: low.longitude,
        };

        map.fitBounds(bounds);
      });
  }, [start, stop, end, routeOptions]);

  if (!route) return null;

  const appearance = { ...defaultAppearance, ...props.appearance };

  const polylines = route.legs.map((leg) => {
    return leg.steps.map((step, index) => {
      const isWalking = step.travelMode === "WALK";
      const color = isWalking
        ? appearance.walkingPolylineColor
        : (step?.transitDetails?.transitLine?.color ??
          appearance.defaultPolylineColor);

      return (
        <Polyline
          key={`${index}-polyline`}
          encodedPath={step.polyline.encodedPolyline}
          strokeWeight={isWalking ? 2 : 6}
          strokeColor={color}
        />
      );
    });
  });

  return (
    <>
      <AdvancedMarker position={start} />
      <AdvancedMarker position={stop} />
      <AdvancedMarker position={end} />

      {polylines}
    </>
  );
};
export default React.memo(Route);
