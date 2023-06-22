import type { Dispatch, FC } from "react";

type ColorBlockProps = {
  /**
   * 颜色块列表
   */
  colorList: string[];

  /**
   * 当前颜色块
   */
  currentColor: string;

  setColor: Dispatch<React.SetStateAction<string>>;
};
const ColorBlock: FC<ColorBlockProps> = (props) => {
  const { colorList, currentColor, setColor } = props;

  return (
    <div style={{ display: "flex", marginBottom: 12 }}>
      {colorList.map((item) => (
        <div
          key={item}
          onClick={() => {
            setColor(item);
          }}
          style={{
            width: 150,
            height: 25,
            background: item,
            textAlign: "center",
          }}
        >
          {currentColor === item && (
            <span
              style={{
                fontSize: 18,
                lineHeight: "25px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              √
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ColorBlock;
