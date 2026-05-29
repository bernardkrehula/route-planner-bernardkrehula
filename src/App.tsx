import "./App.css";
import Btn from "#/components/ui/btn";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const App = () => {
  const customIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [38, 38],
  });
  const markers = [
    {
      geocode: [46.3129033, 16.34],
      popUp: "Welcome to Varazdin",
    },
    {
      geocode: [46.34, 16.28],
      popUp: "Welcome to Sracinec",
    },
  ];
  const tileLayerOptions = {
    attribution: "stamen open street",
    url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.jpg",
  } as any;

  return (
    <div>
      <Btn></Btn>
      <h1>Radi</h1>
      <MapContainer center={[46.3129033, 16.2650311]} zoom={13}>
        {/*  <TileLayer {...tileLayerOptions} /> */}
        <TileLayer {...tileLayerOptions} />
        <MarkerClusterGroup>
          {markers.map((marker, key) => (
            <Marker
              key={key}
              position={marker.geocode}
              {...({ icon: customIcon } as any)}
            >
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default App;
