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
  centre: string[] | ReactNode[];
}
const Area: FC<AreaProps> = (props) => {
  const { header, centre } = props;

  return (
    <div className={`${styles["area-container"]}`}>
      <div
        className={`${styles["area-container-header"]} ${styles.padding} ${styles.borderBottom}`}
      >
        {header}
      </div>
      {centre.length &&
        centre.map((item, idx) => (
          <div
            key={idx}
            className={`${styles["area-container-centre"]} ${styles.padding} ${styles["borderBottom"]}`}
          >
            {item}
          </div>
        ))}
    </div>
  );
};

export default Area;
