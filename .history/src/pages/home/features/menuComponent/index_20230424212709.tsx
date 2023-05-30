import { Tabs } from "antd";

/**
 * 导航栏组件
 * @returns 
 */
export default function MenuComponent() {
  return (
    <Tabs
        tabPosition='left'
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: `Tab ${id}`,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
  )
}
