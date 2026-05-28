import "./App.css";
import Btn from "#/components/ui/btn";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const App = () => {
  const tileLayerOptions = {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  } as any;

  return (
    <div>
      <Btn></Btn>
      <h1>Radi</h1>
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer {...tileLayerOptions} />
      </MapContainer>
    </div>
  );
};

export default App;
