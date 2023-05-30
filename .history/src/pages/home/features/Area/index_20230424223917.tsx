import { FC, ReactNode } from "react";
import styles from "./index.module.less";

interface AreaProps {
    /**
     * @name 头部区域内容
     */
    header: string | ReactNode
}
const Area: FC<AreaProps> = (props) => {

    const { header } = props

  return (
    <div className={styles["area-container"]}>
      <div className={styles["area-container-header"]}>
        { header }
      </div>
    </div>
  );
};

export default Area;
