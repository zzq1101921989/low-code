import { Space, Tabs, TabsProps } from "antd";
import { ClothesIcon, HairIcon, PantsIcon, ShoeIcon } from "../../../../components/icon";

/**
 * 导航栏组件
 * @returns
 */
export default function MenuComponent() {
  const items: TabsProps["items"] = [
    {
      label: (
        <Space>
          <HairIcon />
          发型选择
        </Space>
      ),
      key: "1",
      children: "",
    },
    {
        label: (
          <Space>
            <ClothesIcon />
            衣服选择
          </Space>
        ),
        key: "1",
        children: "",
      },
      {
        label: (
          <Space>
            <PantsIcon />
            裤子选择
          </Space>
        ),
        key: "1",
        children: "",
      },
      {
        label: (
          <Space>
            <ShoeIcon />
            鞋子选择
          </Space>
        ),
        key: "1",
        children: "",
      },
  ];

  return <Tabs tabPosition="left"></Tabs>;
}
