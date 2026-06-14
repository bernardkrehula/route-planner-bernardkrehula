export const travelReducer = (state: TravelInfo, action: TravelAction): TravelInfo => {
  switch (action.type) {
    case "SET_TRAVEL_INFO":
      if (JSON.stringify(state.legs) === JSON.stringify(action.payload.legs))
        return state;
      return { ...state, legs: action.payload.legs };
    case "RESET":
      return { legs: [] };
    default:
      return state;
  }
};