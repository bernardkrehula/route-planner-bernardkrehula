import { createBrowserRouter } from "react-router-dom";
import MapWrapper from "./components/map/MapWrapper";


const router = createBrowserRouter([
  {
    element: <MapWrapper />,
    path: "/",
  },
]);
export default router;
