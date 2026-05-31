import { useNavigate, useSearchParams } from "react-router";
import "./index.css";
import type React from "react";

const TravelOption = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleTravelOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('travel', option);
    navigate(`/?${newParams.toString()}`);
  };

  return (
    <div className="traveling-options-div">
      <select name="traveling" className="traveling-options" onChange={handleTravelOptionSelect}>
        <option value="driving-car">Driving 🚗</option>
        <option value="cycling-regular">Cycling 🚴</option>
        <option value="foot-walking">Walking 🚶‍♂️</option>
      </select>
      <span>▼</span>
    </div>
  );
};
export default TravelOption;
