import Btn from "#/components/ui/btn";
import Input from "#/components/ui/input";
import { useState, type FormEvent } from "react";
import "./index.css";
import { requestCordinates } from "#/api/requestCordinates";
import FormInput from "./FormInput";

const RoutePannel = () => {
  const [activeStop, setActiveStop] = useState<boolean>(false);

  const handleCheckPoints = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const coordinates = {
      start: formData.get("start") as string,
      stop: formData.get("stop") as string,
      destination: formData.get("destination") as string,
      traveling: formData.get("traveling") as string,
    };
    const response = await requestCordinates(coordinates.start);
    response.features.map(feature => {
        console.log(feature.properties.label)
    })
  };
  const addStop = async() => {
    setActiveStop(prev => !prev);
  }
  return (
    <form className="route-pannel" onSubmit={handleCheckPoints}>
      <div className="title">
        <img src="./location.png" />
        <h1>Route planner</h1>
      </div>
      <div className="destination-inputs">
        <FormInput/>
        {activeStop && <Input name="stop" placeholder="Stop" />}
        <Input name="destination" placeholder="Destination" />
      </div>
      <Btn type="button" onClick={addStop} variation="secondary">
        {activeStop ? "Remove stop" : "Add stop"}
      </Btn>
      <div className="traveling-options-div">
        <select name="traveling" className="traveling-options">
          <option value='driving'>Driving 🚗</option>
          <option value='walking'>Walking 🚶‍♂️</option>
        </select>
        <span>▼</span>
      </div>

      <div className="routing-btns">
        <Btn type="submit" variation="secondary">
          Calcutate route
        </Btn>
        <Btn type="reset" variation="secondary">
          Clear route
        </Btn>
      </div>
    </form>
  );
};
export default RoutePannel;
