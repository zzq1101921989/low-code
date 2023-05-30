import { FC } from 'react'

export type LayoutConfig = {
    direction: 'top' | 'left' | 'none',
    width: number,
    height: number,
    value?: LayoutConfig[]
}

type LayoutBoxProps = {
    layoutConfig: LayoutConfig
}
const LayoutBox: FC<LayoutBoxProps> = (props) => {

    const { layoutConfig } = props;

    console.log(layoutConfig);

    return <></>
}

export default LayoutBox
