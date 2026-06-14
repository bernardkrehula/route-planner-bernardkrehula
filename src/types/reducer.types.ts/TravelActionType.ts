import type { LegInfo } from "./LegInfoType";

export type TravelAction =
  | { type: "SET_TRAVEL_INFO"; payload: { legs: LegInfo[] } }
  | { type: "RESET" };

