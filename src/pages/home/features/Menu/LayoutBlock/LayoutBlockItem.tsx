
type Props = {
    config: LowCodeType.LayoutItemConfigType
};
export const LayoutBlockItem = (props: Props) => {

    const { config } = props

    return (
        <img width={51} height={51} src={config.img} />
    );
};