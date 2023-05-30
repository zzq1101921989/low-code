import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/layout";
import { routerConfig } from "./routers";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<LayoutComponent />}>
            {routerConfig.map((item) => (
            <Route
                path={item.path}
                key={item.name}
                element={item.element}
            />
            ))}
        </Route>
        </Routes>
    </BrowserRouter>
  );
};

export default App;
