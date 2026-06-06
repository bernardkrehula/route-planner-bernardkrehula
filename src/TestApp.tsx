import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import "./TestApp.css";
import Input from "./components/ui/input";
import { useAutocompleteSuggestions } from "./hooks/use-autocomplete-suggestions";
const cords = {
  lat: 53.54992,
  lng: 10.00678,
};

const TestApp = () => {
  const [inptuValue, setInputValue] = useState<string>("");
  const { suggestions, isLoading } = useAutocompleteSuggestions(inptuValue, {
    includedPrimaryTypes: ["restaurant"],
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
  };
  console.log("suggestions: ", suggestions, isLoading);
  return (
    <div className="test-app">
      <APIProvider apiKey={"AIzaSyDWQ0xeLJBGFl2AdwlqFrx6Y-RvPccBhzs"}>
        <Input onChange={handleInput} placeholder="Start destination" />
        <Map
          mapId={"4b23a17ec88e6c936e2a6028"}
          defaultZoom={12}
          defaultCenter={cords}
          className="map"
        >
          <AdvancedMarker position={cords}>
            <Pin background="" />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export default TestApp;
