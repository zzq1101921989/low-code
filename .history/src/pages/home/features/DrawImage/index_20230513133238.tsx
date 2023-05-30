import { Col, Row } from "antd";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { ContextMenu, ItemBox } from "../../components";

interface DrawImageProps {}

const DrawImage: FC<DrawImageProps> = (props) => {
  const ele = useRef<HTMLDivElement | null>(null);

  const [contextMenuXy, setContextMenuXy] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const settingContextMenuXy = useCallback((e: Event) => {
    console.log(e);
  }, []);

  // 组织右键菜单的默认事件
  useEffect(() => {
    if (ele.current) {
      ele.current.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
      ele.current.addEventListener("mousedown", (e) => {
        console.log(e.target);
        if (e.button === 0) {
          console.log("Left button clicked");
        } else if (e.button === 2) {
          console.log("Right button clicked");
        }
      });
    }
  }, []);

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
          <ItemBox setXy={settingContextMenuXy} />
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} style={{ height: "100%" }}>
            <Col span={12}>
              <ItemBox setXy={settingContextMenuXy} />
            </Col>
            <Col span={12}>
              <Row gutter={[16, 16]} style={{ height: "100%" }}>
                <Col span={24}>
                  <ItemBox setXy={settingContextMenuXy} />
                </Col>
                <Col span={24}>
                  <ItemBox setXy={settingContextMenuXy} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <ContextMenu left={contextMenuXy.x} top={contextMenuXy.y} />
    </div>
  );
};

export default DrawImage;
