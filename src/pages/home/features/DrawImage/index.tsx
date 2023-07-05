import {
  FC,
  ReactNode,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import { GlobalState } from "../..";
import { ItemBox } from "../../components";
import ContextMenu from "../Contextmenu";
import SeparateLine from "../SeparateLine";
import styles from "./index.module.less";

/**
 * direction 代表排列方向
 * width 取小数，代表的是百分比
 */
const testLayoutCofig: LowCodeType.LayoutConfig[] = [
  {
    direction: "left",
    isTop: true,
    dirW: 1,
    dirH: 1,
    children: [
      {
        dirW: 0.7,
        dirH: 1,
        key: Math.random() * 100000,
        // direction: "top",
        // children: [
        //   {
        //     dirW: 1,
        //     dirH: 0.3,
        //     key: Math.random() * 100000,
        //   },
        //   {
        //     type: "flag",
        //     dirW: 1,
        //     dirH: 1,
        //     key: Math.random() * 100000,
        //   },
        //   {
        //     dirW: 1,
        //     dirH: 0.7,
        //     direction: "left",
        //     children: [
        //       {
        //         dirW: 0.4,
        //         dirH: 1,
        //         key: Math.random() * 100000,
        //       },
        //       {
        //         type: "flag",
        //         dirW: 0,
        //         dirH: 0,
        //         key: Math.random() * 100000,
        //       },
        //       {
        //         dirW: 0.6,
        //         dirH: 1,
        //         direction: "top",
        //         children: [
        //           {
        //             dirW: 1,
        //             dirH: 0.5,
        //             key: Math.random() * 100000,
        //           },
        //           {
        //             type: "flag",
        //             dirW: 0,
        //             dirH: 0,
        //             key: Math.random() * 100000,
        //           },
        //           {
        //             dirW: 1,
        //             dirH: 0.5,
        //             key: Math.random() * 100000,
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // ],
      },
      {
        type: "flag",
        dirW: 0,
        dirH: 0,
        key: Math.random() * 100000,
      },
      {
        dirW: 0.3,
        dirH: 1,
        key: Math.random() * 100000,
        direction: "top",
        children: [
          {
            dirW: 1,
            dirH: 0.5,
            key: Math.random() * 100000,
          },
          {
            type: "flag",
            dirW: 1,
            dirH: 1,
            key: Math.random() * 100000,
          },
          {
            dirW: 1,
            dirH: 0.5,
            key: Math.random() * 100000,
          },
        ],
      },
    ],
  },
];

// 最大的间距是多少
const maxPedding = 110;

const initContextMenu = {
  open: false,
  x: 0,
  y: 0,
};

const DrawImage: FC<any> = (props) => {
  
  const {} = props;

  const globalState = useRecoilValue(GlobalState);
  const { color, paddingPercentage, borderSize } = globalState;

  // 当前计算出来的间距是多少
  const padding = Math.round(maxPedding * (paddingPercentage / 100));

  // 每行最多能有多少box
  const maxContainerWidth = 800 - borderSize;
  const maxContainerHeight = 800 - borderSize;

  const ele = useRef<HTMLDivElement | null>(null);

  // 记录一下当前点击的容器
  const pendingUplaodBox = useRef<ParentNode | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [contextMenu, setContextMenu] = useState<{
    open: boolean;
    x: number;
    y: number;
  }>(initContextMenu);

  const [activeBoxIndex, setActiveBoxIndex] = useState<number | undefined>();

  // 组织右键菜单的默认事件
  useEffect(() => {
    const uploadBtn = document.getElementById("uploadBtn");

    const contextmenuFn = (e: MouseEvent) => {
      e.preventDefault();
    };

    const mousedownFn = (e: any) => {
      if (e.target && (e.button === 0 || e.button === 2)) {
        // 获取上传区域的dom
        const type = (e.target as HTMLElement).getAttribute("data-type");
        const index = (e.target as HTMLElement).getAttribute("data-index");
        if (type === "add") {
          setContextMenu({
            open: true,
            x: e["layerX"] + 20,
            y: e["layerY"] + 20,
          });
          setActiveBoxIndex(Number(index));
          pendingUplaodBox.current = (e.target as HTMLElement).parentNode;
        }
      }
    };

    const click = () => {
      fileRef.current?.click();
    };

    /**
     * 通过image标签获取图片源的真实大小
     * @param urlData
     * @returns
     */
    const saveOriginImageSize = (
      urlData: string
    ): Promise<{ width: number; height: number }> => {
      return new Promise((resolve) => {
        let img: HTMLImageElement | null = new Image();
        // 图像加载完成后的回调函数
        img.onload = function () {
          // 获取图像的宽度和高度
          const width = img!.width;
          const height = img!.height;
          img = null;
          resolve({
            width,
            height,
          });
        };
        // 将图像的源设置为已加载的图片数据
        img.src = urlData;
      });
    };

    const readerFile = async (e: any) => {
      const file = e.target.files[0];
      const urlData = URL.createObjectURL(file);
      const container = pendingUplaodBox.current as HTMLElement;
      const image = container.getElementsByTagName("image")[0];
      if (image) {
        const { width, height } = await saveOriginImageSize(urlData);

        // 显示图片
        image.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          urlData
        );
        image.setAttribute("originWidth", width + "");
        image.setAttribute("originHeight", height + "");

        // 防止内存泄露，释放图片内存
        image.addEventListener("load", () => {
          URL.revokeObjectURL(urlData);
        });

        // 解决上传同一个文件，浏览器认为没变化，而造成读取失败的问题
        fileRef.current!.value = "";
      }

      setContextMenu(initContextMenu);
    };

    uploadBtn?.addEventListener("click", click);

    fileRef.current?.addEventListener("change", readerFile);

    if (ele.current) {
      ele.current.addEventListener("contextmenu", contextmenuFn);
      ele.current.addEventListener("mousedown", mousedownFn);
    }

    return () => {
      uploadBtn?.removeEventListener("click", click);
      fileRef.current?.removeEventListener("change", readerFile);
      ele.current?.removeEventListener("contextmenu", contextmenuFn);
      ele.current?.removeEventListener("mousedown", mousedownFn);
    };
  }, []);

  const createrItemBox = (
    width: number,
    height: number,
    left: number,
    top: number,
    key: any
  ) => {
    return createElement(
      "div",
      {
        className: "edit-container",
        key,
        style: {
          position: "absolute",
          left,
          top,
          width,
          height,
        },
      },
      <ItemBox
        dataIndex={key}
        activeIndex={activeBoxIndex}
        width={width}
        height={height}
      />
    );
  };

  /**
   *
   * @param layout 当前配置
   * @param containerWidth 父级容器的宽度
   * @param containerHeight 父级容器的高度
   * @param occupyWidth 从何位置开始绘制
   * @param occupyHeight 从何位置开始绘制
   * @param isMinusBorder 是否需要减去border
   */
  const handlerLayout = (
    layout: LowCodeType.LayoutConfig[],
    containerWidth: number,
    containerHeight: number,
    occupyWidth?: number,
    occupyHeight?: number,
    parentDirection: string = "left",
    isMinusBorder: boolean = true
  ) => {
    let elements: ReactNode[] = [];

    // 已经占据了多少呢？
    let occupyW = occupyWidth || borderSize;
    let occupyH = occupyHeight || borderSize;

    // 获取父容器的布局方式
    const isLeftLayout = parentDirection === "left";
    const isTopLayout = parentDirection === "top";

    layout.forEach((lay) => {
      // 子元素 布局的方向
      const { dirW, dirH, children, direction, isTop, key } = lay;

      // 有子元素和没有子元素，处理方式不一样
      if (children && direction) {
        // !isTop 代表这不是最顶层的父级容器，最顶层的父级宽高都是不需要 - 中间横杠的数值的
        const currnetW =
          containerWidth * dirW -
          (isLeftLayout && !isTop ? padding / 2 : 0) -
          (isMinusBorder ? borderSize : 0);
        const currnetH =
          containerHeight * dirH -
          (isTopLayout && !isTop ? padding / 2 : 0) -
          (isMinusBorder ? borderSize : 0);

        elements = elements.concat(
          handlerLayout(
            children,
            currnetW,
            currnetH,
            occupyW,
            occupyH,
            direction,
            false
          )
        );

        if (isLeftLayout) occupyW += currnetW;
        if (isTopLayout) occupyH += currnetH;
      } else {
        const { dirH, dirW, type, key } = lay;

        if (type !== "flag") {
          // 不同方向之下，改变的宽高也是不一样的
          const currentWidth =
            containerWidth * dirW - (isLeftLayout ? padding / 2 : 0);
          const currentHeight =
            containerHeight * dirH - (isTopLayout ? padding / 2 : 0);

          elements.push(
            createrItemBox(currentWidth, currentHeight, occupyW, occupyH, key)
          );
          if (isLeftLayout) occupyW += currentWidth;
          if (isTopLayout) occupyH += currentHeight;
        } else {
          if (isLeftLayout) {
            elements.push(
              <SeparateLine
                key={key}
                left={occupyW}
                top={occupyH}
                width={padding}
                height={containerHeight}
                direction="left"
              />
            );
            occupyW += padding;
          } else if (isTopLayout) {
            elements.push(
              <SeparateLine
                key={Math.random() * 100000}
                left={occupyW}
                top={occupyH}
                width={containerWidth}
                height={padding}
                direction="top"
              />
            );
            occupyH += padding;
          }
        }
      }
    });

    return elements;
  };

  return (
    <div
      style={{
        width: "800px",
        height: "800px",
        margin: "10px auto",
        backgroundColor: color,
        boxShadow: "0 0 10px #d9d6d6",
      }}
    >
      <div
        className={styles.drawImageContainer}
        ref={ele}
        style={{
          position: "relative",
          width: maxContainerWidth,
          height: maxContainerHeight,
        }}
      >
        {handlerLayout(testLayoutCofig, maxContainerWidth, maxContainerHeight)}
        <ContextMenu
          left={contextMenu.x}
          top={contextMenu.y}
          open={contextMenu.open}
        />
        {/* 上传元素 */}
        <input
          ref={fileRef}
          type="file"
          id="cellImgPicker"
          accept="image/jpeg,image/png"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default DrawImage;
