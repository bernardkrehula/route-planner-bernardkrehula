import React, { useState } from "react";
import "./index.css";
import Input from "#/components/ui/input";
import { requestCordinates } from "#/api/requestCordinates";
import type { GeoJsonFeature } from "#/types/geo.types.ts/GeoJsonFeatureType";
import { debouncedFetch } from "#/utils/debounceFetch";
import type { FormInputType } from "#/types/form.types.ts/FormInputType";
import Btn from "#/components/ui/btn";
import ListItem from "./ListItem";

const FormInput = ({
  name,
  placeholder,
  searchParams,
  navigate,
  setInputValues,
  inputValues
}: FormInputType) => {
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

  const handleSearchRequest = async (destination: string) => {
    const response = await requestCordinates(destination);
    setSearchedDestinations(response.features);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValues(prev => ({...prev, [name]: value}));
    if (value.trim() != "") {
      debouncedFetch(value, handleSearchRequest);
      setActiveSearch(true);
    } else {
      setActiveSearch(false);
      setSearchedDestinations([]);
    }
  };

  const handleDestinationClick = async (destination: string) => {
    setInputValues(prev => ({...prev, [name]: destination}));
    setActiveSearch(false);
    const response = await requestCordinates(destination);
    const cords = response.features[0].geometry.coordinates;
    const newParams = new URLSearchParams(searchParams);
    newParams.set(name, cords);
    navigate(`/?${newParams.toString()}`);
  };

  

  return (
    <form className="form-input">
      <Input
        name={name}
        placeholder={placeholder}
        value={inputValues[name]}
        onChange={handleInputChange}
        variation={activeSearch && "custom-search"}
      />
      {activeSearch && (
        <ul className="destination-options">
          {searchedDestinations.map((feature, key) => {
            const label = feature.properties.label;
            return (
              <ListItem key={key} label={label} handleDestinationClick={handleDestinationClick}/>
            );
          })}
        </ul>
      )}
    </form>
  );
};
export default FormInput;
