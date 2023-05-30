import { Col, Row } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { ContextMenu, ItemBox } from "../../components";

interface DrawImageProps {}

const DrawImage: FC<DrawImageProps> = (props) => {
  const ele = useRef<HTMLDivElement | null>(null);

  // 记录一下当前点击的容器
  const pendingUplaodBox = useRef<HTMLElement | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [contextMenu, setContextMenu] = useState<{
    open: boolean;
    x: number;
    y: number;
  }>({
    open: false,
    x: 0,
    y: 0,
  });

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
          pendingUplaodBox.current = e.target as HTMLElement;
        }
      }
    };

    const uploadFile = () => {
      fileRef.current?.click();
    };

    const readerFile = (e: any) => {
      const file = e.target.files[0];
      const urlData = URL.createObjectURL(file);
      const image: any =
        pendingUplaodBox.current?.getElementsByTagName("image");
      if (image) image["xlinkHref"] = urlData;
    };

    uploadBtn?.addEventListener("click", uploadFile);

    fileRef.current?.addEventListener("change", readerFile);

    if (ele.current) {
      ele.current.addEventListener("contextmenu", contextmenuFn);
      ele.current.addEventListener("mousedown", mousedownFn);
    }

    return () => {
      uploadBtn?.removeEventListener("click", uploadFile);
      fileRef.current?.removeEventListener("change", readerFile);
      ele.current?.removeEventListener("contextmenu", contextmenuFn);
      ele.current?.removeEventListener("mousedown", mousedownFn);
    };
  }, []);

  // 定义一个索引，表示每个ItemBox的编号
  let itemIndex = 0;

  return (
    <div
      ref={ele}
      style={{
        position: "relative",
        width: "803px",
        height: "803px",
        padding: "20px",
        margin: "10px auto",
        background: "#fff",
        boxShadow: "0 0 10px #d9d6d6",
      }}
    >
      <Row gutter={[16, 16]} style={{ height: "100%" }}>
        <Col span={24}>
          <ItemBox dataIndex={itemIndex} activeIndex={activeBoxIndex} />
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} style={{ height: "100%" }}>
            <Col span={12}>
              <ItemBox dataIndex={++itemIndex} activeIndex={activeBoxIndex} />
            </Col>
            <Col span={12}>
              <Row gutter={[16, 16]} style={{ height: "100%" }}>
                <Col span={24}>
                  <ItemBox
                    dataIndex={++itemIndex}
                    activeIndex={activeBoxIndex}
                  />
                </Col>
                <Col span={24}>
                  <ItemBox
                    dataIndex={++itemIndex}
                    activeIndex={activeBoxIndex}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
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
