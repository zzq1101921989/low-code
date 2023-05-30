import { Col, Row } from "antd";
import { FC } from "react";
import { ItemBox } from "../../components";

interface DrawImageProps {}
const DrawImage: FC<DrawImageProps> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row
        gutter={[16, 16]}
        style={{
          width: "803px",
          height: "803px",
          padding: '25px',
          background: "#fff",
          boxShadow: "0 0 10px #d9d6d6",
        }}
      >
        <Col span={8}><ItemBox/></Col>
        <Col span={8}><ItemBox/></Col>
        <Col span={8}><ItemBox/></Col>
        <Col span={8}><ItemBox/></Col>
      </Row>
    </div>
  );
};

export default DrawImage;
