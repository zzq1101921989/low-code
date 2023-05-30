import type { FC } from "react";
import { memo } from "react";

interface ItemBoxProps {
  /**
   * @name 元素的宽度为多少
   */
  width: number;

  /**
   * @name 元素的高度为多少
   */
  height: number;
}
const ItemBox: FC<ItemBoxProps> = (props) => {
  const { width, height } = props;
  return (
    <div
      style={{
        border: "2px dashed rgba(30, 128, 255, 0.5)",
      }}
    ></div>
  );
};
export default memo(ItemBox);
