import { DOMElement, FC, createElement } from 'react'

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
    layoutConfig: LayoutConfig[]

    /**
     * 容器最大宽度
     */
    containerWidth: number,

    
    /**
     * 容器最大高度
     */
    containerHeight: number,

    /**
     * 间距
     */
    padding: number,
}
const LayoutBox: FC<LayoutBoxProps> = (props) => {

    const { layoutConfig, containerWidth, padding } = props;

    console.log(layoutConfig);

    const handlerCreateElement = (config: LayoutConfig[]): DOMElement<any, any>[] => {
        const ele = config.map(item => {

            const width = item.width
            const height = item.height

            if (item.value?.length) {
                return createElement('div', {
                    className: 'edit-container',
                    style: {
                        display: item.direction === 'left' ? 'flex' : 'block',
                        width, 
                        height
                    }
                }, handlerCreateElement(item.value))
            } else {
                return createElement('div', {
                    className: 'edit-box',
                    style: {
                        width, 
                        height
                    }
                })
            }
        })

        return ele
    }

    return <>{handlerCreateElement(layoutConfig)}</>
}

export default LayoutBox
