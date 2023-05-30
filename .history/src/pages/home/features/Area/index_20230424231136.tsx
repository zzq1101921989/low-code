import { Form } from "antd";
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
    <Form className={`${styles["area-container"]}`}>
      <div
        className={`${styles["area-container-header"]} ${styles.padding} ${styles.borderBottom}`}
      >
        {header}
      </div>
      {centre && (
        <div
          className={`${styles["area-container-centre"]} ${styles.padding} ${styles["borderBottom"]}`}
        >
          {centre}
        </div>
      )}
    </Form>
  );
};

export default Area;
