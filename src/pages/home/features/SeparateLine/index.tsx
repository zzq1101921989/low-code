import { FC } from "react";
import { Direction } from "../DrawImage";
import styles from "./index.module.less";

type SeparateLineProps = {
  left: number;
  top: number;
  width: number;
  height: number;
  direction: Direction;
};
const SeparateLine: FC<SeparateLineProps> = (props) => {
  const { left, top, width, height, direction } = props;
  return (
    <div
      className={styles.lineContainer}
      style={{
        left,
        top,
        width,
        height,
        flexDirection: direction === "top" ? "column" : "row",
      }}
    >
      <div 
        className={styles.line}
        style={{
            cursor: direction === 'left' ? 'e-resize' : 'n-resize',
            width: direction === 'left' ? width * 0.2 : width,
            height: direction === 'top' ? height * 0.2 : height
        }}
      />
    </div>
  );
};

export default SeparateLine;
