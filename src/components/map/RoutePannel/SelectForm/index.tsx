import type React from "react";
import "./index.css";
import Option from "./Option";

const SelectForm = ({
  handleTravelOptionSelect,
}: {
  handleTravelOptionSelect: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}) => {
  return (
    <form className="traveling-options-div">
      <select
        name="traveling"
        className="traveling-options"
        onChange={handleTravelOptionSelect}
      >
        <Option value="driving-car" label="Driving 🚗" />
        <Option value="foot-walking" label="Walking 🚶‍♂️" />
        <Option value="cycling-regular" label="Cycling 🚴" />
      </select>
      <span>▼</span>
    </form>
  );
};
export default SelectForm;
