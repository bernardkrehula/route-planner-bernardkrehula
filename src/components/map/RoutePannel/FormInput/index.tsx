import { useState } from "react";
import "./index.css";
import Input from "#/components/ui/input";
import debounce from "debounce";
import { requestCordinates } from "#/api/requestCordinates";
import type { GeoJsonFeature } from "#/types/geo.types.ts/GeoJsonFeatureType";
import { debouncedFetch } from "#/utils/debounceFetch";

const FormInput = () => {
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
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchRequest = async (destination: string) => {
    const response = await requestCordinates(destination);
    setSearchedDestinations(response.features);
    console.log("features: ", response.features);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() != "") {
      debouncedFetch(value, handleSearchRequest);
      setActiveSearch(true);
    } else {
      setActiveSearch(false);
      setSearchedDestinations([]);
    }
  };
  const handleDestinationClick = (destination: string) => {
    setInputValue(destination);
    setActiveSearch(false);
  };

  return (
    <fieldset className="form-input">
      <Input
        name="start"
        placeholder="Starting point"
        value={inputValue}
        onChange={handleInputChange}
        variation={activeSearch && "custom-search"}
      />
      {activeSearch && (
        <ul className="destination-options">
          {searchedDestinations.map((feature) => {
            const label = feature.properties.label;
            return (
              <li onClick={() => handleDestinationClick(label)}>{label}</li>
            );
          })}
        </ul>
      )}
    </fieldset>
  );
};
export default FormInput;
