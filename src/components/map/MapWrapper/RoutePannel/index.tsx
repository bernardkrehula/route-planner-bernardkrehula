import Btn from "#/components/ui/btn";
import { useState } from "react";
import "./index.css";
import FormInput from "./FormInput";
import SelectForm from "./SelectForm";
import { useAutocompleteSuggestions } from "#/hooks/use-autocomplete-suggestions";
import { filterSuggestions } from "#/utils/suggestionFilter";
import { distanceCalculator } from "#/utils/distanceCalculator";
import { timeCalculator } from "#/utils/timeCalculator";
import type { DestinationClickType } from "#/types/form.types.ts/DestinationClickType";

const RoutePannel = ({ state, dispatch }) => {
  const [activeStop, setActiveStop] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState({
    start: "",
    stop: "",
    end: "",
  });
  const [activeSearch, setActiveSearch] = useState({
    start: false,
    stop: false,
    end: false,
  });
  const activeInputName = Object.keys(activeSearch).find(
    (key) => activeSearch[key],
  );

  const { suggestions: rawSuggestions } = useAutocompleteSuggestions(
    inputValues[activeInputName],
  );

  const getCoordinates = async (destinationId: string) => {
    const { Place } = await google.maps.importLibrary("places");
    const place = new Place({
      id: destinationId,
    });
    await place.fetchFields({
      fields: ["displayName", "formattedAddress", "location", "googleMapsURI"],
    });

    const { lat: latitude, lng: longitude } = place.location;
    const lat = latitude();
    const lng = longitude();
    dispatch({
      type: "SET_COORDS",
      payload: {checkpoint: activeInputName, coords: {lat, lng}}
    })
  };

  const suggestions = filterSuggestions(rawSuggestions);

  const addStopDestination = async () => {
    setActiveStop((prev) => !prev);
    setInputValues((prev) => ({ ...prev, stop: "" }));
    if(inputValues.stop === '') return
    dispatch({
      type: "SET_COORDS",
      payload: { checkpoint: "stop", coords: null }
    });
  };
  const clearRoute = () => {
    setInputValues({
      start: "",
      stop: "",
      end: "",
    });
    dispatch({ type: "RESET" });
    setActiveStop(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputValues((prev) => ({ ...prev, [name]: value }));
    if (value.trim() != "") {
      setActiveSearch((prev) => ({ ...prev, [name]: true }));
    } else {
      setActiveSearch((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleDestinationClick = async (props: DestinationClickType) => {
    const {locationId, location, inputName} = props;
    setActiveSearch((prev) => ({ ...prev, [inputName]: false }));
    setInputValues((prev) => ({ ...prev, [inputName]: location }));
    getCoordinates(locationId);
  };

  const handleTravelOptionSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const option = e.target.value;
    dispatch({
      type: "SET_TRAVEL_MODE",
      payload: {
        travelMode: option
      }
    })
  };

  const travelInfo =
    state.legs != null &&
    state.legs.map((leg) => {
      const distance = distanceCalculator(leg.distance);
      const duration = timeCalculator(parseFloat(leg.duration));
      return (
        <div className="travel-info">
          <span>Distance: {distance}</span>
          <span>Duration: {duration}</span>
        </div>
      );
    });

  return (
    <div className="route-pannel">
      <div className="title">
        <img src="./location.png" />
        <h1>Route planner</h1>
      </div>
      <div className="destination-inputs">
        <FormInput
          name="start"
          placeholder="Start destination"
          handleInputChange={handleInputChange}
          inputValues={inputValues}
          activeSearch={activeSearch}
          handleDestinationClick={handleDestinationClick}
          suggestions={suggestions}
        />
        {travelInfo[1]}
        {activeStop && (
          <FormInput
            name="stop"
            placeholder="Stop"
            handleInputChange={handleInputChange}
            inputValues={inputValues}
            activeSearch={activeSearch}
            handleDestinationClick={handleDestinationClick}
            suggestions={suggestions}
          />
        )}
        {travelInfo[0]}
        <FormInput
          name="end"
          placeholder="Destination"
          handleInputChange={handleInputChange}
          inputValues={inputValues}
          activeSearch={activeSearch}
          handleDestinationClick={handleDestinationClick}
          suggestions={suggestions}
        />
      </div>
      <Btn type="button" onClick={addStopDestination} variation="secondary">
        {activeStop ? "Remove stop" : "Add stop"}
      </Btn>
      <SelectForm handleTravelOptionSelect={handleTravelOptionSelect} />
      <Btn type="reset" onClick={clearRoute} variation="secondary">
        Clear route
      </Btn>
    </div>
  );
};
export default RoutePannel;
