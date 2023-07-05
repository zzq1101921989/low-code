import { Slider } from "antd";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { GlobalState } from "../../../";
import { Area } from "../../../components";
import { LayoutBlockItem } from "./LayoutBlockItem";
import config from "./LayoutConfig";

type LayoutBlockProps = {};

export const LayoutBlock: FC<LayoutBlockProps> = (props) => {
  
  const {} = props;

  const [globalState, setGlobalState] = useRecoilState(GlobalState);

  const { borderSize, paddingPercentage } = globalState;

  return (
    <Area
      header="布局"
      centre={[
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px",
            boxSizing: "border-box",
          }}
        >
          <div>
            间距
            <Slider
              defaultValue={paddingPercentage}
              onChange={(v) => {
                setGlobalState((oldState) => {
                  return {
                    ...oldState,
                    paddingPercentage: v,
                  };
                });
              }}
            />
          </div>
          <div>
            边框
            <Slider
              defaultValue={borderSize}
              onChange={(v) => {
                setGlobalState((oldState) => {
                  return {
                    ...oldState,
                    borderSize: v,
                  };
                });
              }}
            />
          </div>
          <div>
            圆角
            <Slider defaultValue={10} />
          </div>
        </div>,
        <div className="layout-block-container">
          {config.map((item) => {
            return <LayoutBlockItem config={item} />;
          })}
        </div>,
      ]}
    />
  );
};
