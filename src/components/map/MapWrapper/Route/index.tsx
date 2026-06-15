import React, { useEffect, useState, type Dispatch } from "react";
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  useMap,
} from "@vis.gl/react-google-maps";

import { Polyline } from "./Polyline";
import { RoutesApi } from "../constants/routes-api";
import type { TravelInfo } from "#/types/reducer.types.ts/TravelInfoType";
import type { TravelAction } from "#/types/reducer.types.ts/TravelActionType";

const defaultAppearance = {
  walkingPolylineColor: "#000000",
  defaultPolylineColor: "#9a1e45",
  stepMarkerFillColor: "#333333",
  stepMarkerBorderColor: "#000000",
};

type Appearance = typeof defaultAppearance;

export type RouteProps = {
  apiClient: RoutesApi;
  routeOptions?: any;
  appearance?: Partial<Appearance>;
  dispatch: Dispatch<TravelAction>;
  state: TravelInfo;
};

const Route = (props: RouteProps) => {
  const { apiClient, routeOptions, dispatch, state } = props;
  const { coordinates, route, travelMode } = state;
  const { start, stop, end } = coordinates;

  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (start === null || end === null) return;

    apiClient
      .computeRoutes(start, end, stop, {
        ...routeOptions,
        travelMode: state.travelMode,
      })
      .then((res) => {
        const [route] = res.routes;

        dispatch({
          type: "SET_ROUTE",
          payload: route,
        });

        const legsInfo = route.legs.map((leg) => ({
          duration: parseInt(leg.duration),
          distance: leg.distanceMeters,
        }));
        dispatch({
          type: "SET_TRAVEL_INFO",
          payload: {
            legs: legsInfo,
          },
        });
        const { high, low } = route.viewport;
        const bounds: google.maps.LatLngBoundsLiteral = {
          north: high.latitude,
          south: low.latitude,
          east: high.longitude,
          west: low.longitude,
        };

        map.fitBounds(bounds);
      });
  }, [start, stop, end, travelMode]);

  if (!route) return null;

  const appearance = { ...defaultAppearance, ...props.appearance };

  const polylines = route.legs.map((leg) => {
    return leg.steps.map((step, index) => {
      const isWalking = step.travelMode === "WALK";
      const color = isWalking
        ? appearance.walkingPolylineColor
        : appearance.defaultPolylineColor;
      
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
