import { Col, Row } from "antd";
import { FC, useEffect, useRef } from "react";
import { ItemBox } from "../../components";

interface DrawImageProps {}

const DrawImage: FC<DrawImageProps> = (props) => {

  const ele = useRef<HTMLDivElement | null>(null);

  // 组织右键菜单的默认事件
  useEffect(() => {
    if (ele.current) {
      ele.current.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
      ele.current.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          console.log('Left button clicked');
        } else if (e.button === 2) {
          console.log('Right button clicked');
        }
      });
    }
  }, []);

  return (
    <div
      ref={ele}
      style={{
        width: "803px",
        height: "803px",
        padding: "20px",
        margin: '10px auto',
        background: "#fff",
        boxShadow: "0 0 10px #d9d6d6",
      }}
    >
      <Row gutter={[16, 16]} style={{ height: '100%' }}>
        <Col span={24}>
          <ItemBox />
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]} style={{ height: '100%' }}>
            <Col span={12}>
              <ItemBox />
            </Col>
            <Col span={12}>
              <Row gutter={[16, 16]} style={{ height: '100%' }}>
                <Col span={24}><ItemBox /></Col>
                <Col span={24}><ItemBox /></Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DrawImage;
