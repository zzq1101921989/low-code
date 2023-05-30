import type { FC } from "react";
import { memo } from "react";
import styles from "./index.module.less";

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
        className={styles["itemBox"]}
        style={{
            width,
            height
        }}
    ></div>
  );
};
export default memo(ItemBox);
