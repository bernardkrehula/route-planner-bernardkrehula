import type { InputValuesType } from "./InputValuesType";
import type { GeoJsonFeature } from "../geo.types.ts/GeoJsonFeatureType";

export type FormInputType = {
  name: string;
  placeholder: string;
  inputValues: InputValuesType;
  activeSearch: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchedDestinations: GeoJsonFeature[];
  handleDestinationClick: (value: string) => void;
};
