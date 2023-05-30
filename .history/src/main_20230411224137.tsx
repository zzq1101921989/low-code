import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import "./reset.css";
import routers from "./routers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={routers} />
);
