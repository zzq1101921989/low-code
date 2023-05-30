import { Slider, Space, Tabs, TabsProps } from "antd";
import { Dispatch, FC } from "react";
import { Area } from "..";
import {
  ColorIcon,
  ImageIcon,
  LayoutIcon,
  TextIcon,
} from "../../../../components/icon";

type MenuProps = {
  /**
   * 间距百分比
   */
  paddingPercentage: number
  setPaddingPercentage: Dispatch<React.SetStateAction<number>>
}

/**
 * 导航栏组件
 */
const Menu: FC<MenuProps> = (props) => {

  const { paddingPercentage, setPaddingPercentage } = props;

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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: '10px 20px',
                boxSizing: 'border-box'
              }}
            >
              <div>
                间距
                <Slider defaultValue={paddingPercentage} onChange={setPaddingPercentage} />
              </div>
              <div>
                边框
                <Slider defaultValue={10} />
              </div>
              <div>
                圆角
                <Slider defaultValue={10} />
              </div>
            </div>
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

export default Menu