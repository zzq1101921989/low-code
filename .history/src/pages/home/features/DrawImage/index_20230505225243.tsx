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
      <div
        style={{
          width: "803px",
          height: "803px",
          padding: '30px',
          background: "#fff",
          boxShadow: "0 0 10px #d9d6d6",
        }}
      >
        <ItemBox />
        <ItemBox />
        <ItemBox />
        <ItemBox />
      </div>
    </div>
  );
};

export default DrawImage;
