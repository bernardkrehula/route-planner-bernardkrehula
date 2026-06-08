import Btn from "#/components/ui/btn";
import { useState } from "react";
import "./index.css";
import FormInput from "./FormInput";
import { parseRouteCoordinates } from "#/utils/mapHelper";
import SelectForm from "./SelectForm";
import { useAutocompleteSuggestions } from "#/hooks/use-autocomplete-suggestions";
import { filterSuggestions } from "#/utils/suggestionFilter";

const RoutePannel = ({ searchParams, navigate, setCoordinates }) => {
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

  const { suggestions: rawSuggestions, isLoading } = useAutocompleteSuggestions(
    inputValues[activeInputName],
  );

 

  const suggestions = filterSuggestions(rawSuggestions);

  const addStopDestination = async () => {
    setActiveStop((prev) => !prev);
  };
  const clearRoute = () => {
    /* navigate("");
    setInputValues(() => ({
      start: "",
      stop: "",
      end: "",
    })); */
  };

  const handleSearchRequest = async (destination: string) => {};
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

  const handleDestinationClick = async (locationId, location, inputName) => {
    setActiveSearch((prev) => ({ ...prev, [inputName]: false }));
    setInputValues((prev) => ({ ...prev, [inputName]: "" }));
    getCoordinates(locationId);
  };

  const handleTravelOptionSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const option = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("travel", option);
    navigate(`/?${newParams.toString()}`);
  };

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
      <div className="routing-btns">
        <Btn type="button" variation="secondary">
          Calcutate route
        </Btn>
        <Btn type="reset" onClick={clearRoute} variation="secondary">
          Clear route
        </Btn>
      </div>
    </div>
  );
};
export default RoutePannel;
