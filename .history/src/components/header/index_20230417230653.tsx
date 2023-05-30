import { Menu, MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routerConfig } from "../../routers";

export default function HeaderComponent() {
    
  const locaiton = useLocation();

  console.log(locaiton.pathname.split("/"), '1111');
  

  const items: MenuProps["items"] = routerConfig.map((key) => ({
    key: key.path,
    label: <Link to={`/${key.path}`}>{key.name}</Link>,
  }));
  
  return (
    <Menu
      style={{ flex: 1 }}
      mode="horizontal"
      selectedKeys={[locaiton.pathname.split("/")[1]]}
      items={items}
    />
  );
}
