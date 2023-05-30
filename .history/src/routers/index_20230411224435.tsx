import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "home",
    element: <Home />,
  },
]);
