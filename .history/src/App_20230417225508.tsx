import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/layout";
import { routerConfig } from "./routers";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          {/* 重定向 */}
          <Route path="/" element={<Navigate to="/home" />} />
          {routerConfig.map((item) => (
            <Route path={item.path} key={item.name} element={item.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
