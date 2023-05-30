import { Space, Tabs, TabsProps } from "antd";
import {
    ImageIcon,
    LayoutIcon,
    ShoeIcon,
    TextIcon
} from "../../../../components/icon";

/**
 * 导航栏组件
 * @returns
 */
export default function MenuComponent() {
  const items: TabsProps["items"] = [
    {
      label: (
        <Space>
          <LayoutIcon />
          布局
        </Space>
      ),
      key: "1",
      children: "",
    },
    {
      label: (
        <Space>
          <ImageIcon />
          传图
        </Space>
      ),
      key: "2",
      children: "",
    },
    {
      label: (
        <Space>
          <TextIcon />
          文字
        </Space>
      ),
      key: "3",
      children: "",
    },
    {
      label: (
        <Space>
          <ShoeIcon />
          背景
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
