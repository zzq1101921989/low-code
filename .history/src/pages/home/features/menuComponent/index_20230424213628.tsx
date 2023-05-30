import { Space, Tabs, TabsProps } from "antd";

/**
 * 导航栏组件
 * @returns
 */
export default function MenuComponent() {

    const items: TabsProps['items'] = [
        {
            label: (
                <Space></Space>
            ),
            key: '1',
            children: ''
        }
    ]

  return (
    <Tabs tabPosition="left">

    </Tabs>
  );
}
