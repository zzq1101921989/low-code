import { FC } from "react";
import styles from './index.modlue.less';

type ContextMenuProps = {

}
const ContextMenu: FC<ContextMenuProps> = (props) => {
    const { } = props;
    return (
        <div className={styles.contextMenu}>
            <div>添加图片</div>
            <div>填充背景</div>
          </div>
      )
}
export default ContextMenu
