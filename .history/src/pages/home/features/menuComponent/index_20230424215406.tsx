import { Space, Tabs, TabsProps } from "antd";
import { ClothesIcon, PantsIcon, ShoeIcon } from "../../../../components/icon";

/**
 * 导航栏组件
 * @returns
 */
export default function MenuComponent() {
  const items: TabsProps["items"] = [
    {
      label: (
        <Space direction='vertical'>
          <img src="data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='21' xmlns='http://www.w3.org/2000/svg' fill='%23005cf9'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M1.574.328h8.82v9.594H.799v-8.82c0-.428.347-.774.775-.774ZM11.593.328h8.82c.428 0 .774.346.774.774v18.84a.775.775 0 0 1-.774.774h-8.82V.328Z' fill='%23213FD5'/%3E%3Cpath d='M.799 11.122h9.595v9.594h-8.82a.775.775 0 0 1-.775-.774v-8.82Z' fill='%237C1AFD'/%3E%3C/g%3E%3C/svg%3E" />
          布局
        </Space>
      ),
      key: "1",
      children: "",
    },
    {
        label: (
          <Space direction='vertical'>
            <ClothesIcon />
            衣服选择
          </Space>
        ),
        key: "2",
        children: "",
      },
      {
        label: (
          <Space direction='vertical'>
            <PantsIcon />
            裤子选择
          </Space>
        ),
        key: "3",
        children: "",
      },
      {
        label: (
          <Space direction='vertical'>
            <ShoeIcon />
            鞋子选择
          </Space>
        ),
        key: "4",
        children: "",
      },
  ];

  return <Tabs tabPosition="left" items={items} style={{background: '#fff', padding: '15px 0'}} />
}
