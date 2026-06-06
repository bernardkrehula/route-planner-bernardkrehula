import { createBrowserRouter } from "react-router-dom";
import MapWrapper from "./components/map/MapWrapper";
import TestApp from "./TestApp";

const defaultCoords = [46.31, 16.34];

const router = createBrowserRouter([
  {
    element: <TestApp/>,
    path: "/",
  },
]);
export default router;
