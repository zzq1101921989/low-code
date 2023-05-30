import { Row } from "antd";
import { FC } from "react";

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
      {/* // TODO: 通过观察可以简略的通过col进行划分，最多可以容纳 4*4 的方块 */}
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
      </Row>
    </div>
  );
};

export default DrawImage;
