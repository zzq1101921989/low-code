import { Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";
import { routerConfig } from "../../routers";

export default function HeaderComponent() {
  const items: MenuProps["items"] = routerConfig.map((key) => ({
    key: key.path,
    label: <Link to={`/${key.path}`}>{key.name}</Link>,
  }));

  return (
    <Menu
      style={{ flex: 1 }}
      mode="horizontal"
      defaultSelectedKeys={["home"]}
      items={items}
    />
  );
}
