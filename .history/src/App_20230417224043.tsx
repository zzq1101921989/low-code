import { Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/layout";
import { routerConfig } from "./routers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />}>
        {routerConfig.map((item) => (
          <Route
            index={t\
            }
            path={item.path}
            key={item.name}
            element={item.element}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
