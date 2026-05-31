import Btn from "#/components/ui/btn";
import Input from "#/components/ui/input";
import { useState, type FormEvent } from "react";
import "./index.css";
import FormInput from "./FormInput";
import { requestRoute } from "#/api/requestRoute";
import TravelOption from "./TravelOption";
import { useNavigate, useSearchParams } from "react-router";
import { parseRouteCoordinates } from "#/utils/mapHelper";

const RoutePannel = ({handleTravelRoute}) => {
  const [activeStop, setActiveStop] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const startParam = searchParams.get("start");

  const handleCheckPoints = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const coordinates = {
      traveling: formData.get("traveling") as string,
    };
    const startParam = searchParams.get("start");
    const endParams = searchParams.get("end");
    const cords = parseRouteCoordinates(startParam, endParams);
    handleTravelRoute(cords);
  };

  const addStopDestination = async () => {
    setActiveStop((prev) => !prev);
  };
  const clearRoute = () => {
    navigate("");
  };
  return (
    <form className="route-pannel" onSubmit={handleCheckPoints}>
      <div className="title">
        <img src="./location.png" />
        <h1>Route planner</h1>
      </div>
      <div className="destination-inputs">
        <FormInput name="start" placeholder="Start destination" />
        {activeStop && <FormInput name="stop" placeholder="Stop" />}
        <FormInput name="end" placeholder="Destination" />
      </div>
      <Btn type="button" onClick={addStopDestination} variation="secondary">
        {activeStop ? "Remove stop" : "Add stop"}
      </Btn>
      <TravelOption />
      <div className="routing-btns">
        <Btn type="submit" variation="secondary">
          Calcutate route
        </Btn>
        <Btn type="reset" onClick={clearRoute} variation="secondary">
          Clear route
        </Btn>
      </div>
    </form>
  );
};
export default RoutePannel;
