import { FC, memo, useRef, useState } from "react";
import styles from "./index.module.less";

interface ItemBoxProps {
  /**
   * 当前选中的焦点区域
   */
  activeIndex?: number;

  /**
   * 当前组件的索引
   */
  dataIndex: number;

  /**
   * 容器的宽
   */
  width: number;

  /**
   * 容器的高
   */
  height: number;
}

const ItemBox: FC<ItemBoxProps> = (props) => {
  const { activeIndex, dataIndex, width, height } = props;

  const [openAddMask, setOpenAddMask] = useState(true);

  const image = useRef<SVGImageElement | null>(null);

  image.current?.addEventListener("load", () => {
    setOpenAddMask(false);
  });

  const handlerBorder = () => {
    if (openAddMask) {
      return {
        border: `2px ${
          activeIndex === dataIndex ? "solid #2354f4" : "dashed #1e80ff80"
        }`,
      };
    } else if (!openAddMask && activeIndex === dataIndex) {
      return {
        border: "2px solid #2354f4",
      };
    } else {
      return {};
    }
  };

  // 图片的高度
  const imageWidth = image.current?.getBoundingClientRect().width;
  const imageHeight = image.current?.getBoundingClientRect().height;

  // 计算高度缩放比例
  const scaleRatio = imageHeight ? height / imageHeight : 0;

  // 宽度固定的同时，计算等比宽度，防图片变形
  const scaleRatioImageWidth = imageWidth ? imageWidth * scaleRatio : 0;

  return (
    <div className={styles.itemBox}>
      <svg
        view-box={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          style={{
            transform: "matrix(1, 0, 0, 1, 0, 0)",
          }}
        >
          <image
            ref={image}
            {...(scaleRatioImageWidth && { width: scaleRatioImageWidth })}
            height={height}
          />
        </g>
      </svg>

      {/* 叉叉 */}
      <span className={styles.close}>
        <svg
          version="1.1"
          id="图层_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.8,1.6l-0.7,0.7L7.8,5.6L4.6,2.3L3.9,1.6L3.1,2.3L2,3.4L1.3,4.1L2,4.8l3.3,3.3L2,11.4l-0.7,0.7L2,12.8 L3.1,14l0.7,0.7L4.6,14l3.3-3.3l3.3,3.3l0.7,0.7l0.7-0.7l1.1-1.1l0.7-0.7l-0.7-0.7l-3.3-3.3l3.3-3.3l0.7-0.7l-0.7-0.7l-1.1-1.1 L11.8,1.6L11.8,1.6z"
            style={{
              opacity: 0.9,
              fill: "rgb(255, 255, 255)",
            }}
          ></path>{" "}
          <g>
            <polygon points="13,4.1 11.8,3 7.8,7 3.9,3 2.7,4.1 6.7,8.1 2.7,12.1 3.9,13.3 7.8,9.3 11.8,13.3 13,12.1 9,8.1 	"></polygon>
          </g>
        </svg>
      </span>

      {/* 加号 */}
      <span
        style={{
          display: openAddMask ? "flex" : "none",
        }}
        className={styles.add}
        data-type="add"
        data-index={dataIndex}
      >
        +
      </span>

      {/* 边框 */}
      <div
        className="item-border"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
          ...handlerBorder(),
          boxSizing: "border-box",
        }}
      ></div>
    </div>
  );
};
export default memo(ItemBox);
