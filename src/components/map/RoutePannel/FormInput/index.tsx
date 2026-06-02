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
  searchedDestinations,
  handleDestinationClick
}: FormInputType) => {

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
