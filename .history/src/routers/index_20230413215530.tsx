import { RouteObject, createBrowserRouter } from "react-router-dom";
import Admin from "../pages/admin";
import Home from "../pages/home";
import Recommend from "../pages/recommend";

export const routerConfig: ( RouteObject & {name: string} )[] = [
    {
        path: "home",
        // name: '在线随心搭',
        element: <Home/>,
    },
    {
        path: "recommend",
        // name: '搭配推荐',
        element: <Recommend/>,
    },
    {
        path: "admin",
        // name: '个人中心',
        element: <Admin/>,
    },
]

export default createBrowserRouter(routerConfig);
