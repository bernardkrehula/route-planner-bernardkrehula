import type { TravelAction } from "#/types/reducer.types.ts/TravelActionType";
import type { TravelInfo } from "#/types/reducer.types.ts/TravelInfoType";

export const travelReducer = (
  state: TravelInfo,
  action: TravelAction,
): TravelInfo => {
  switch (action.type) {
    case "SET_ROUTE":
      return { ...state, route: action.payload };
    case "SET_COORDS":
      const { checkpoint, coords } = action.payload;
      const { lat, lng } = coords;
      return {
        ...state,
        coordinates: {
          ...state.coordinates,
          [checkpoint]: { lat: lat, lng: lng },
        },
      };
    case "SET_TRAVEL_MODE":
      const { travelMode } = action.payload;
      return { ...state, travelMode: travelMode };
    case "SET_TRAVEL_INFO":
      if (JSON.stringify(state.legs) === JSON.stringify(action.payload.legs))
        return state;
      return { ...state, legs: action.payload.legs };
    case "RESET":
      return {
        legs: [],
        coordinates: { start: null, stop: null, end: null },
        route: null,
        travelMode: "DRIVE",
      };
    default:
      return state;
  }
};
