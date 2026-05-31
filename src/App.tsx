import { useEffect, useState } from "react";
import "./App.css";
import MapWrapper from "./components/map/MapWrapper";
import RoutePannel from "./components/map/RoutePannel";
import { requestRoute } from "./api/requestRoute";
import { useNavigate } from "react-router";
import { timeCalculator } from "./utils/timeCalculator";
import { distanceCalculator } from "./utils/distanceCalculator";

const App = ({ defaultCoords }) => {
 
  const [travelRoute, setTravelRoute] = useState([[0, 0]]);
  

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
