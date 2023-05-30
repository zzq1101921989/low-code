import {
  FC,
  ReactNode,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { ContextMenu, ItemBox } from "../../components";
import { LayoutConfig } from "./LayoutBox";

const initContextMenu = {
  open: false,
  x: 0,
  y: 0,
};

// 每行最多能有多少box
const containerWidth = 800;
const containerHeight = 800;

type DrawImageProps = {
  /**
   * 间距
   */
  padding: number;
};

const DrawImage: FC<DrawImageProps> = (props) => {
  const { padding } = props;

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

    const mousedownFn = (e: MouseEvent) => {
      if (e.target && (e.button === 0 || e.button === 2)) {
        // 获取上传区域的dom
        const type = (e.target as HTMLElement).getAttribute("data-type");
        const index = (e.target as HTMLElement).getAttribute("data-index");
        if (type === "add") {
          const offsetLeftTotal =
            ele.current!.offsetLeft +
            (ele.current!.parentNode as HTMLElement | null)!.offsetLeft;
          const offsetTopTotal =
            ele.current!.offsetTop +
            (ele.current!.parentNode as HTMLElement | null)!.offsetTop;
          setContextMenu({
            open: true,
            x: e.clientX - offsetLeftTotal,
            y: e.clientY - offsetTopTotal + 10,
          });
          setActiveBoxIndex(Number(index));
          pendingUplaodBox.current = (e.target as HTMLElement).parentNode;
        }
      }
    };

    const click = () => {
      fileRef.current?.click();
    };

    const readerFile = (e: any) => {
      const file = e.target.files[0];
      const urlData = URL.createObjectURL(file);
      const container = pendingUplaodBox.current as HTMLElement;
      const image = container.getElementsByTagName("image")[0];
      if (image) {
        const clientWidth = container.clientWidth;
        const clientHeight = container.clientHeight;

        // 显示图片
        image.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          urlData
        );

        // 防止内存泄露，释放图片内存
        image.addEventListener("load", () => {
          URL.revokeObjectURL(urlData);
        });

        // 解决上传同一个文件，浏览器认为没变化，而造成读取失败的问题
        fileRef.current!.value = "";

        (container.parentNode as HTMLElement)!.style.width = clientWidth + "px";
        (container.parentNode as HTMLElement)!.style.height =
          clientHeight + "px";
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

  // 定义一个索引，表示每个ItemBox的编号
  let itemIndex = 0;

  /**
   * direction 代表排列方向
   * width 取小数，代表的是百分比
   */
  const layoutConfig: LayoutConfig[] = [
    {
      direction: "left",
      width: 1,
      height: 1,
      value: [
        {
          direction: "top",
          width: 0.7,
          height: 1,
          value: [
            {
              direction: "none",
              width: 1,
              height: 0.3,
            },
            {
              direction: "left",
              width: 1,
              height: 0.7,
              value: [
                {
                  width: 0.35,
                  height: 1,
                  direction: "none",
                },
                {
                  direction: "top",
                  width: 0.65,
                  height: 1,
                  value: [
                    {
                      direction: "none",
                      width: 1,
                      height: 0.6,
                    },
                    {
                      direction: "none",
                      width: 1,
                      height: 0.4,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          direction: "top",
          width: 0.3,
          height: 1,
          value: [
            {
              direction: "none",
              width: 1,
              height: 0.5,
            },
            {
              direction: "none",
              width: 1,
              height: 0.5,
            },
          ],
        },
      ],
    },
  ];

  const testLayoutCofig: LayoutConfig[] = [
    {
      direction: "left",
      dirW: 1,
      dirH: 1,
      value: [
        {
          direction: "top",
          dirW: 0.7,
          dirH: 1,
          value: [
            {
              direction: "none",
              dirW: 1,
              dirH: 0.3,
            },
            {
              direction: "none",
              dirW: 1,
              dirH: 0.7,
            },
          ],
        },
        {
          direction: "none",
          dirW: 0.3,
          dirH: 1,
        },
      ],
    },
  ];

  const isFirstOrLast = (total: number, idx: number) => {
    if (idx === 0) return "isStart";
    if (idx === total - 1) {
      return "isEnd";
    }
    return "";
  };

  /**
   * 根据矩形的位置配置文件，计算矩形的left，top，width，height
   * @param {LayoutConfig} position 矩形的配置
   * @param {number} occupied.width 已经占据了多少宽度
   * @param {number} occupied.height 已经占据了多少高度
   * @param {number} containerWH.width 父级容器高度
   * @param {number} containerWH.height 父级容器高度
   * @param {number} padding 间距
   * @param {number} direction 排列的方式
   * @param {string} flag 第一个元素和最后一个元素都是要单独处理的
   */
  const handlerComputeRect = (
    position: LayoutConfig,
    occupied: { width: number; height: number },
    containerWH: { width: number; height: number },
    padding: number,
    direction: "top" | "left",
    flag: "isStart" | "isEnd" | ""
  ): ReactNode => {
    // 获取子元素占据的比例是多少
    const { dirW, dirH } = position;

    const { width, height } = containerWH;

    const handlerPositon = () => {
      if (direction === "left") {
        if (flag === "isEnd") {
          return {
            left: occupied.width + padding,
            top: occupied.height,
            width: width * dirW - padding,
            height: height * dirH,
          };
        } else if (flag === "isStart") {
          const left = occupied.width;
          occupied.width = width * dirW;
          return {
            left,
            top: occupied.height,
            width: width * dirW - padding,
            height: height * dirH,
          };
        } else {
        }
      } else if (direction === "top") {
        if (flag === "isStart") {
          return {
            left: 0,
            top: occupied.height,
            width: width * dirW - padding,
            height: height * dirH,
          };
        } else if (flag === "isEnd") {
          return {
            left: 0,
            top: occupied.height + padding,
            width: width * dirW,
            height: height * dirH - padding,
          };
        }
      }
    };

    return createElement(
      "div",
      {
        key: Math.random() * 1000000,
        className: "edit-container",
        style: {
          position: "absolute",
          ...handlerPositon(),
        },
      },
      <ItemBox dataIndex={0} />
    );
  };

  /**
   * 执行任务
   * @param { LayoutConfig[] } positions
   * @param { number } originWidth
   * @param { number } originHeight
   * @returns ReactNode[]
   */
  const execute = (
    positions: LayoutConfig[],
    originWidth: number,
    originHeight: number
  ) => {
    
    let elements: ReactNode[] = [];

    positions.forEach((item, i) => {
      // 获取这次布局的位置是怎么划分的
      const direction = item.direction;

      // 元素划分
      const value = item.value;

      // 已经占据了多少位置
      let occupied = {
        width: 0,
        height: 0,
      };


      value?.forEach((it, idx) => {
        // 第一个和最后一个都是需要特殊处理的
        const flag = isFirstOrLast(value?.length, idx);

        console.log(it);

        switch (direction) {
          case "left":
            elements = elements.concat(
              it.value?.length
                ? execute(
                    it.value,
                    Math.round(originWidth * it.dirW),
                    Math.round(originHeight * it.dirH)
                  )
                : [
                    handlerComputeRect(
                      it,
                      occupied,
                      {
                        width: originWidth,
                        height: originHeight,
                      },
                      padding,
                      direction,
                      flag
                    ),
                  ]
            );
            break;
          case "top":
            break;
          case "none":
            break;
          default:
            break;
        }
      });
    });

    return elements;
  };

  return (
    <div
      ref={ele}
      style={{
        position: "relative",
        width: containerWidth,
        height: containerHeight,
        margin: "10px auto",
        background: "#fff",
        boxShadow: "0 0 10px #d9d6d6",
      }}
    >
      {execute(testLayoutCofig, containerWidth, containerHeight)}
      {/* <LayoutBox
        layoutConfig={layoutConfig}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        padding={padding}
      /> */}

      {/* <Row gutter={[16, 16]} style={{ height: "100%" }}>
        <Col span={24}>
          <ItemBox areaHeight={2 * 200} dataIndex={itemIndex} activeIndex={activeBoxIndex} />
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} style={{ height: "100%" }}>
            <Col span={12}>
              <ItemBox areaHeight={2 * 200} dataIndex={++itemIndex} activeIndex={activeBoxIndex} />
            </Col>
            <Col span={12}>
              <Row gutter={[16, 16]} style={{ height: "100%" }}>
                <Col span={24}>
                  <ItemBox
                    areaHeight={200}
                    dataIndex={++itemIndex}
                    activeIndex={activeBoxIndex}
                  />
                </Col>
                <Col span={24}>
                  <ItemBox
                    areaHeight={200}
                    dataIndex={++itemIndex}
                    activeIndex={activeBoxIndex}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row> */}
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
  );
};

export default DrawImage;
