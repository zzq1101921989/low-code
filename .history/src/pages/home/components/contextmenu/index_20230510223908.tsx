import { FC } from "react";
import styles from "./index.module.less";

type ContextMenuProps = {};
const ContextMenu: FC<ContextMenuProps> = (props) => {
  const {} = props;
  return (
    <div className={styles.contextMenu}>
      <div className={styles.contextMenuItem}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="图层_1"
          x="0px"
          y="0px"
          viewBox="0 0 16 16"
          enable-background="new 0 0 16 16"
          xmlSpace="preserve"
        >
          <path d="M3.5,7C2.672,7,2,6.328,2,5.5S2.672,4,3.5,4S5,4.672,5,5.5S4.328,7,3.5,7z M1,2h13c0.552,0,1,0.448,1,1v10  c0,0.552-0.448,1-1,1H1c-0.552,0-1-0.448-1-1V3C0,2.448,0.448,2,1,2z M14,11.294V3H1v10h0.297l5.687-5l4.433,5h0.661l-1.916-2.267  l1.843-1.77L14,11.294z"></path>
        </svg>
        添加图片
      </div>
      <div className={styles.contextMenuItem}>填充背景</div>
    </div>
  );
};
export default ContextMenu;
