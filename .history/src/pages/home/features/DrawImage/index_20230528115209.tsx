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
  const testLayoutCofig: LayoutConfig[] = [
    {
      direction: "left",
      dirW: 1,
      dirH: 1,
      children: [
        {
          dirW: 0.7,
          dirH: 1,
          // direction: "top",
          // children: [
          //   {
          //     dirW: 1,
          //     dirH: 0.3,
          //   },
          //   {
          //     dirW: 1,
          //     dirH: 0.7,
          //   },
          // ],
        },
        {
          type: "flag",
          dirW: 0.7,
          dirH: 1,
        },
        {
          dirW: 0.3,
          dirH: 1,
        },
      ],
    },
  ];

  const createrItemBox = (
    width: number,
    height: number,
    left: number,
    top: number
  ) => {
    return createElement(
      "div",
      {
        className: "edit-container",
        key: Math.random() * 100000,
        style: {
          position: "absolute",
          left,
          top,
          width,
          height,
        },
      },
      <ItemBox dataIndex={0} />
    );
  };

  /**
   *
   * @param layout
   * @param containerWidth
   * @param containerHeight
   */
  const handlerLayout = (
    layout: LayoutConfig[],
    containerWidth: number,
    containerHeight: number
  ) => {
    let elements: ReactNode[] = [];

    layout.forEach((lay) => {
      // 子元素
      const children = lay.children;

      // 布局的方向
      const direction = lay.direction;

      // 有子元素和没有子元素，处理方式有一定的不一样
      if (children) {
        // 已经占据了多少呢？
        let occupyWidth = 0;
        let occupyHeight = 0;

        children.forEach((child) => {
          const { dirH, dirW, type, children: childs } = child;

          // 不同方向之下，改变的宽高也是不一样的
          const currentWidth =
            direction === "left"
              ? containerWidth * dirW - padding
              : containerWidth * dirW;
          const currentHeight =
            direction === "top"
              ? containerHeight * dirH - padding
              : containerHeight * dirH;

          if (type !== "flag") {
            elements.push(
              createrItemBox(
                currentWidth,
                currentHeight,
                occupyWidth,
                occupyHeight
              )
            );
            occupyWidth += currentWidth;
            if (direction === "top") {
              occupyHeight += currentHeight;
            }
          } else {
            elements.push(
              <div
                key={Math.random() * 100000}
                style={{
                  position: "absolute",
                  left: occupyWidth,
                  top: occupyHeight,
                  width: padding,
                  height: containerHeight,
                }}
              ></div>
            );
          }

          // elements = elements.concat(handlerLayout(childs))
        });
      } else {
        elements.push(createrItemBox(containerWidth, containerHeight, 0, 0));
      }
    });

    return elements;
  };

  console.log(handlerLayout(testLayoutCofig, containerWidth, containerHeight));

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
      {handlerLayout(testLayoutCofig, containerWidth, containerHeight)}
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
