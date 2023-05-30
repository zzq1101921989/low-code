import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { routerConfig } from "../../routers";

export default function HeaderComponent() {

  const [state, setState] = useState("home");

  const items: MenuProps["items"] = routerConfig.map((key) => ({
    key: key.path,
    label: <Link to={`/${key.path}`}>{key.name}</Link>,
  }));

  return (
    <Menu
      style={{ flex: 1 }}
      mode="horizontal"
      defaultSelectedKeys={[state]}
      items={items}
    />
  );
}
