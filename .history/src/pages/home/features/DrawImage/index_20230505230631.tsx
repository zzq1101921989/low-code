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
          position: 'relative',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          display: 'flex',
          width: "803px",
          height: "803px",
          padding: '25px',
          background: "#fff",
          boxShadow: "0 0 10px #d9d6d6",
        }}
      >
        <ItemBox width={350} height={350} />
        <ItemBox width={350} height={350} />
        <ItemBox width={350} height={350} />
        <ItemBox width={350} height={350} />
      </div>
    </div>
  );
};

export default DrawImage;
