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
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.984,13.169C15.169,15.754,13.748,16,12.512,16  c-1.236,0-2.781-0.308-2.472-2.831C10.225,11.631,12.512,8,12.512,8S14.86,11.815,14.984,13.169z M13,7.051  c0,0.203-0.103,0.457-0.258,0.659l-5.829,5.986c-0.413,0.406-1.032,0.406-1.444,0L0.31,8.42c-0.413-0.457-0.413-1.116,0-1.522  l3.663-3.754L1.806,0.913c-0.206-0.203-0.206-0.507,0-0.761c0.206-0.203,0.516-0.203,0.722,0l2.167,2.283L6.19,0.913  c0.413-0.406,1.032-0.406,1.444,0l5.056,5.275C12.948,6.442,13,6.746,13,7.051z M1.97,6.611h9.848L6.869,1.556l-1.4,1.458  l1.75,1.799c0.2,0.194,0.2,0.535,0,0.729c-0.2,0.194-0.5,0.194-0.7,0l-1.75-1.799L1.97,6.611z"
          ></path>
        </svg>
        填充背景
      </div>
    </div>
  );
};
export default ContextMenu;
