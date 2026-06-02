import Btn from "#/components/ui/btn";
import { useState } from "react";
import "./index.css";
import FormInput from "./FormInput";
import { parseRouteCoordinates } from "#/utils/mapHelper";
import SelectForm from "./SelectForm";
import type { GeoJsonFeature } from "#/types/geo.types.ts/GeoJsonFeatureType";

const RoutePannel = ({ calculateTravelRoute, searchParams, navigate }) => {
  const [activeStop, setActiveStop] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState({
    start: "",
    stop: "",
    end: "",
  });

  const handleCheckPoints = () => {
    const startParam = searchParams.get("start");
    const endParams = searchParams.get("end");
    const travelParams = searchParams.get("travel") || "driving-car";
    const cords = parseRouteCoordinates(startParam, endParams);
    calculateTravelRoute(cords, travelParams);
  };

  const addStopDestination = async () => {
    setActiveStop((prev) => !prev);
  };
  const clearRoute = () => {
    navigate("");
    setInputValues(() => ({
      start: "",
      stop: "",
      end: "",
    }));
  };
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [searchedDestinations, setSearchedDestinations] = useState<
    GeoJsonFeature[]
  >([
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [],
      },
      properties: {
        id: "",
        gid: "",
        layer: "",
        source: "",
        source_id: "",
        name: "",
        confidence: null,
        match_type: "",
        accuracy: "",
        country: "",
        country_gid: "",
        country_a: "",
        region: "",
        region_gid: "",
        region_a: "",
        county: "",
        county_gid: "",
        county_a: "",
        continent: "",
        continent_gid: "",
        label: "",
      },
      bbox: [],
    },
  ]);

  const handleSearchRequest = async (destination: string) => {
    const response = await requestCordinates(destination);
    setSearchedDestinations(response.features);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValues((prev) => ({ ...prev, [name]: value }));
    if (value.trim() != "") {
      debouncedFetch(value, handleSearchRequest);
      setActiveSearch(true);
    } else {
      setActiveSearch(false);
      setSearchedDestinations([]);
    }
  };

  const handleDestinationClick = async (destination: string) => {
    setInputValues((prev) => ({ ...prev, [name]: destination }));
    setActiveSearch(false);
    const response = await requestCordinates(destination);
    const cords = response.features[0].geometry.coordinates;
    const newParams = new URLSearchParams(searchParams);
    newParams.set(name, cords);
    navigate(`/?${newParams.toString()}`);
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
          searchedDestinations={searchedDestinations}
          handleDestinationClick={handleDestinationClick}
        />
        {activeStop && (
          <FormInput
            name="stop"
            placeholder="Stop"
            handleInputChange={handleInputChange}
            inputValues={inputValues}
            activeSearch={activeSearch}
            searchedDestinations={searchedDestinations}
            handleDestinationClick={handleDestinationClick}
          />
        )}
        <FormInput
          name="end"
          placeholder="Destination"
          handleInputChange={handleInputChange}
          inputValues={inputValues}
          activeSearch={activeSearch}
          searchedDestinations={searchedDestinations}
          handleDestinationClick={handleDestinationClick}
        />
      </div>
      <Btn type="button" onClick={addStopDestination} variation="secondary">
        {activeStop ? "Remove stop" : "Add stop"}
      </Btn>
      <SelectForm handleTravelOptionSelect={handleTravelOptionSelect} />
      <div className="routing-btns">
        <Btn type="button" onClick={handleCheckPoints} variation="secondary">
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
