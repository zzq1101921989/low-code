import { Col, Row } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { ContextMenu, ItemBox } from "../../components";

interface DrawImageProps {}

const DrawImage: FC<DrawImageProps> = (props) => {

  const ele = useRef<HTMLDivElement | null>(null);

  const [contextMenu, setContextMenu] = useState<{open: boolean, x: number; y: number }>({
    open: false,
    x: 0,
    y: 0,
  });
  
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | undefined>()

  // 组织右键菜单的默认事件
  useEffect(() => {
    if (ele.current) {
      ele.current.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
      ele.current.addEventListener("mousedown", (e) => {
        if (e.target && (e.button === 0 || e.button === 2) ) {
          const type = ( e.target as HTMLElement ).getAttribute('data-type')
          const index = ( e.target as HTMLElement ).getAttribute('data-index')
          if (type === 'add') {
            setContextMenu({
              open: true,
              x: e.offsetX + 20,
              y: e.offsetY + 30 
            })

            console.log(e.clientX, 'e.clientX', e.clientY, 'e.clientY');

            setActiveBoxIndex(Number(index))
          }
        }
      });
    }
  }, []);

  // 定义一个索引，表示每个ItemBox的编号
  let itemIndex = 0

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
                  <ItemBox dataIndex={++itemIndex} activeIndex={activeBoxIndex} />
                </Col>
                <Col span={24}>
                  <ItemBox dataIndex={++itemIndex} activeIndex={activeBoxIndex} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <ContextMenu left={contextMenu.x} top={contextMenu.y} open={contextMenu.open} />
    </div>
  );
};

export default DrawImage;
