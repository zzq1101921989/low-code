import { Space, Tabs, TabsProps } from "antd";
import { LayoutIcon, PantsIcon, ShoeIcon } from "../../../../components/icon";

/**
 * 导航栏组件
 * @returns
 */
export default function MenuComponent() {
  const items: TabsProps["items"] = [
    {
      label: (
        <Space direction="vertical">
          <LayoutIcon />
          布局
        </Space>
      ),
      key: "1",
      children: "",
    },
    {
      label: <Space direction="vertical">传图</Space>,
      key: "2",
      children: "",
    },
    {
      label: (
        <Space direction="vertical">
          <PantsIcon />
          裤子选择
        </Space>
      ),
      key: "3",
      children: "",
    },
    {
      label: (
        <Space direction="vertical">
          <ShoeIcon />
          鞋子选择
        </Space>
      ),
      key: "4",
      children: "",
    },
  ];

  return (
    <Tabs
      tabPosition="left"
      items={items}
      style={{ background: "#fff", padding: "15px 0" }}
    />
  );
}
