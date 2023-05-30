import { FC, ReactNode } from "react";
import styles from "./index.module.less";

interface AreaProps {
  /**
   * @name 头部区域内容
   */
  header: string | ReactNode;

  /**
   * @name 中间区域内容
   */
  centre?: string | ReactNode;
}
const Area: FC<AreaProps> = (props) => {
  const { header, centre } = props;

  return (
    <div className={`${styles["area-container"]} ${styles["paddingLeft"]}`}>
      <div
        className={`${styles["area-container-header"]} ${styles["paddingTopAndBottom"]} ${styles["borderBottom"]}`}
      >
        {header}
      </div>
      <div
        className={`${styles["area-container-centre"]} ${styles["paddingTopAndBottom"]} ${styles["borderBottom"]}`}
      >
        {centre}
      </div>
    </div>
  );
};

export default Area;
