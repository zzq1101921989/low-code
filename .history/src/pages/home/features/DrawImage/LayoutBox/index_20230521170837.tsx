import { FC } from 'react'

export type LayoutConfig = {
    direction: 'top' | 'left' | 'none',
    width: number,
    height: number,
    value?: LayoutConfig[]
}

type LayoutBoxProps = {
    /**
     * 布局配置
     */
    layoutConfig: LayoutConfig

    /**
     * 容器最大宽度
     */
    containerWidth: number,

    
    /**
     * 容器最大高度
     */
    containerHeight: number,
}
const LayoutBox: FC<LayoutBoxProps> = (props) => {

    const { layoutConfig } = props;

    console.log(layoutConfig);

    return <></>
}

export default LayoutBox
