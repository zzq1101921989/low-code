import { GlobalState } from "@/pages/home";
import { useRecoilState } from "recoil";

type Props = {
    config: LowCodeType.LayoutItemConfigType
};
export const LayoutBlockItem = (props: Props) => {

    const { config } = props

    const [, setGlobalState] = useRecoilState(GlobalState);

    const onClick = () => {
        setGlobalState((oldState) => {
            return {
              ...oldState,
              layoutConfig: config,
            };
          });
    }

    return (
        <img onClick={onClick} width={51} height={51} src={config.img} />
    );
};