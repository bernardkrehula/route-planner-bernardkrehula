import Btn from "#/components/ui/btn";
import { useState } from "react";
import "./index.css";
import FormInput from "./FormInput";
import TravelOption from "./TravelOption";
import { parseRouteCoordinates } from "#/utils/mapHelper";

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
          searchParams={searchParams}
          navigate={navigate}
          setInputValues={setInputValues}
          inputValues={inputValues}
        />
        {activeStop && (
          <FormInput
            name="stop"
            placeholder="Stop"
            searchParams={searchParams}
            navigate={navigate}
            setInputValues={setInputValues}
            inputValues={inputValues}
          />
        )}
        <FormInput
          name="end"
          placeholder="Destination"
          searchParams={searchParams}
          navigate={navigate}
          setInputValues={setInputValues}
          inputValues={inputValues}
        />
      </div>
      <Btn type="button" onClick={addStopDestination} variation="secondary">
        {activeStop ? "Remove stop" : "Add stop"}
      </Btn>
      <TravelOption />
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
