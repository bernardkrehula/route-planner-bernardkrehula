import { createBrowserRouter } from "react-router-dom";
import MapWrapper from "./components/map/MapWrapper";

const defaultCoords = [46.31, 16.34];

const router = createBrowserRouter([
  {
    element: <MapWrapper/>,
    path: "/",
  },
]);
export default router;
