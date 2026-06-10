import "./index.css";
import Input from "#/components/ui/input";
import type { FormInputType } from "#/types/form.types.ts/FormInputType";
import ListItem from "./ListItem";

const FormInput = ({
  name,
  placeholder,
  inputValues,
  activeSearch,
  handleInputChange,
  handleDestinationClick,
  suggestions,
}: FormInputType) => {
  return (
    <form className="form-input">
      <Input
        name={name}
        placeholder={placeholder}
        value={inputValues[name]}
        onChange={handleInputChange}
        variation={activeSearch[name] && "custom-search"}
      />
      {activeSearch[name] && (
        <ul className="destination-options">
          {suggestions.map((suggestion, key) => {
            const { locationId, location } = suggestion;

            return (
              <ListItem
                key={key}
                label={location}
                handleDestinationClick={() =>
                  handleDestinationClick(locationId, location, name)
                }
              />
            );
          })}
        </ul>
      )}
    </form>
  );
};
export default FormInput;
