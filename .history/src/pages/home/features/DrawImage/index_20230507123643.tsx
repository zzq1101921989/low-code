import { Col, Row } from "antd";
import { FC } from "react";
import { ItemBox } from "../../components";

interface DrawImageProps {}
const DrawImage: FC<DrawImageProps> = (props) => {
  return (
    <div
      style={{
        width: "803px",
        height: "803px",
        padding: "25px",
        margin: '10px auto',
        background: "#fff",
        boxShadow: "0 0 10px #d9d6d6",
      }}
    >
      <Row gutter={[16, 16]} style={{ height: '100%' }}>
        <Col span={24}>
          <ItemBox />
        </Col>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ItemBox />
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default DrawImage;
