import type { InputValuesType } from "./InputValuesType";

export type FormInputType = {
  name: string;
  placeholder: string;
  inputValues: InputValuesType;
  activeSearch: {
    start: boolean;
    stop: boolean;
    end: boolean;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDestinationClick: (props: {
    locationId: string,
    location: string,
    inputName: string,
  }) => Promise<void>;
  suggestions: {
    location: string;
    locationId: string;
  }[];
};
