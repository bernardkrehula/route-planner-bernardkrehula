import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const defaultCoords = [46.31, 16.34];

const router = createBrowserRouter([
  {
    element: <App defaultCoords={defaultCoords}/>,
    path: "/"
  },
]);
export default router;
