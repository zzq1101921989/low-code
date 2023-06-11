import type { FC } from "react";

type ColorBlockProps = {
  colorList: string[];
};
const ColorBlock: FC<ColorBlockProps> = (props) => {
  const { colorList } = props;

  return (
    <div style={{ display: "flex", marginBottom: 12 }}>
      {colorList.map((item) => (
        <div style={{ width: 150, height: 25, background: item }}></div>
      ))}
    </div>
  );
};

export default ColorBlock;
