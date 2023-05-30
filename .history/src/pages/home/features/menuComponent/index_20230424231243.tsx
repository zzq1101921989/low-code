import { Slider, Space, Tabs, TabsProps } from "antd";
import { Area } from "..";
import {
    ColorIcon,
    ImageIcon,
    LayoutIcon,
    TextIcon,
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
      children: (
        <Area
          header="布局"
          centre={
            <>
              <Space>
                间距
                <Slider defaultValue={10} />
              </Space>
              <Space>
                边框
                <Slider defaultValue={10} />
              </Space>
              <Space>
                圆角
                <Slider defaultValue={10} />
              </Space>
            </>
          }
        />
      ),
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
          <ColorIcon />
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
      style={{ background: "#fff", height: "100%" }}
    />
  );
}
