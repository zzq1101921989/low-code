import type { FC } from "react";
import { memo } from "react";

interface ItemBoxProps {

}
const ItemBox: FC<ItemBoxProps> = (props) => {
  const {  } = props;
  return (
    <div
      style={{
        border: "2px dashed rgba(30, 128, 255, 0.5)",
      }}
    ></div>
  );
};
export default memo(ItemBox);
