import type { FC } from "react";
import { memo } from "react";
import styles from './index.module.less';

interface ItemBoxProps {

}
const ItemBox: FC<ItemBoxProps> = (props) => {
  const {  } = props;
  return (
    <div className={styles.itemBox}>
      <span className={styles.close}>X</span>
    </div>
  );
};
export default memo(ItemBox);
