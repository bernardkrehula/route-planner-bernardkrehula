import { useEffect, useState } from "react";
import "./App.css";
import MapWrapper from "./components/map/MapWrapper";
import RoutePannel from "./components/map/RoutePannel";
import { requestRoute } from "./api/requestRoute";
import { useNavigate } from "react-router";
import { timeCalculator } from "./utils/timeCalculator";
import { distanceCalculator } from "./utils/distanceCalculator";

const App = ({ defaultCoords }) => {
  const navigate = useNavigate();
  const [travelRoute, setTravelRoute] = useState([[0, 0]]);
  const [travelInfo, setTravelInfo] = useState({
    distance: '0',
    duration: '0',
  });

  useEffect(() => {
    navigate("");
  }, []);

  const handleTravelRoute = async (cords, travelOption) => {
    const response = await requestRoute(cords, travelOption);
    const rawCoordinates = response.geometry.coordinates;
    const leafletReadyRoute = rawCoordinates.map(([lng, lat]) => [lat, lng]);
    const info = response.properties.summary;
    const duration = timeCalculator(info.duration)
    const distance = distanceCalculator(info.distance);
    const infoAboutTravel = {duration, distance}
    console.log(duration)
    setTravelInfo(infoAboutTravel);
    setTravelRoute(leafletReadyRoute);
  };

  return (
    <div className="app">
      <RoutePannel handleTravelRoute={handleTravelRoute} />
      <MapWrapper
        defaultCoords={defaultCoords}
        travelRoute={travelRoute}
        travelInfo={travelInfo}
      />
    </div>
  );
};

export default App;
