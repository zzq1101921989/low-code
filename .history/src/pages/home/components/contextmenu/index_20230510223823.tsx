import { FC } from "react";
import styles from "./index.module.less";

type ContextMenuProps = {

}
const ContextMenu: FC<ContextMenuProps> = (props) => {
    const { } = props;
    return (
        <div className={styles.contextMenu}>
            <div className={styles.contextMenuItem}>添加图片</div>
            <div className={styles.contextMenuItem}>填充背景</div>
          </div>
      )
}
export default ContextMenu
