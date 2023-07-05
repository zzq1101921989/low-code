import type { FC } from "react";
import { useRecoilState } from "recoil";
import { GlobalState } from "../../..";

type ColorBlockProps = {
  /**
   * 颜色块列表
   */
  colorList: string[];
};
const ColorBlock: FC<ColorBlockProps> = (props) => {
  
  const { colorList } = props;

  const [globalState, setGlobalState] = useRecoilState(GlobalState);

  const { color } = globalState;

  return (
    <div style={{ display: "flex", marginBottom: 12 }}>
      {colorList.map((item) => (
        <div
          key={item}
          onClick={() => {
            setGlobalState((oldState) => {
              return {
                ...oldState,
                color: item,
              };
            });
          }}
          style={{
            width: 150,
            height: 25,
            background: item,
            textAlign: "center",
          }}
        >
          {color === item && (
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
