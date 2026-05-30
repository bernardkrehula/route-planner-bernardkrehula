import "./App.css";
import MapWrapper from "./components/map/MapWrapper";
import RoutePannel from "./components/map/RoutePannel";

const App = () => {
  return (
    <div className="app">
      <RoutePannel />
      <MapWrapper />
    </div>
  );
};

export default App;
