import { Slider, Space, Tabs, TabsProps } from "antd";
import { Dispatch, FC } from "react";
import {
  ColorIcon,
  ImageIcon,
  LayoutIcon,
  TextIcon,
} from "../../../../components/icon";
import { Area } from "../../components";
import ColorBlock from "./ColorBlock";

type MenuProps = {
  /**
   * 间距百分比
   */
  paddingPercentage: number
  setPaddingPercentage: Dispatch<React.SetStateAction<number>>
  color: string
  setColor: Dispatch<React.SetStateAction<string>>
}

/**
 * 导航栏组件
 */
const Menu: FC<MenuProps> = (props) => {

  const { paddingPercentage, setPaddingPercentage, setColor, color } = props;

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
          <ColorIcon />
          背景
        </Space>
      ),
      key: "4",
      children: <Area
        header='颜色'
        centre={
          <>
            <ColorBlock setColor={setColor} currentColor={color} colorList={['#00474f', '#006d75', '#13c2c2', '#36cfc9', '#5cdbd3', '#b5f5ec']} />
            <ColorBlock setColor={setColor} currentColor={color} colorList={['#002c8c', '#003eb3', '#0958d9', '#1677ff', '#4096ff', '#69b1ff']} />
            <ColorBlock setColor={setColor} currentColor={color} colorList={['#061178', '#10239e', '#1d39c4', '#2f54eb', '#597ef7', '#85a5ff']} />
            <ColorBlock setColor={setColor} currentColor={color} colorList={['#22075e', '#391085', '#531dab', '#722ed1', '#9254de', '#b37feb']} />
            <ColorBlock setColor={setColor} currentColor={color} colorList={['#1f1f1f', '#262626', '#434343', '#595959', '#8c8c8c', '#bfbfbf']} />
            <ColorBlock setColor={setColor} currentColor={color} colorList={['#ad4e00', '#d46b08', '#fa8c16', '#ffa940', '#ffc069', '#ffd591']} />
            <ColorBlock setColor={setColor} currentColor={color} colorList={['#ad2102', '#d4380d', '#fa541c', '#ff7a45', '#ff9c6e', '#ffbb96']} />
            <ColorBlock setColor={setColor} currentColor={color} colorList={['#a8071a', '#cf1322', '#f5222d', '#ff4d4f', '#ff7875', '#ffa39e']} />
            <ColorBlock setColor={setColor} currentColor={color} colorList={['rgb(38, 50, 56)', 'rgb(69, 90, 100)', 'rgb(96, 125, 139)', 'rgb(144, 163, 174)', 'rgb(207, 216, 221)', 'rgb(237, 239, 241)']} />
          </>       }
      />,
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