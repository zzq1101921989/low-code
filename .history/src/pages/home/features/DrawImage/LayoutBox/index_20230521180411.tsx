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

    const { layoutConfig, containerWidth, containerHeight, padding } = props;

    const handlerCreateElement = (config: LayoutConfig[], orgiginWidth: number, orgiginHeight: number): DOMElement<any, any>[] => {
        const ele = config.map(item => {

            const width = orgiginWidth * item.width
            
            const height = orgiginHeight * item.height

            if (item.value?.length) {
                return createElement('div', {
                    className: 'edit-container',
                    style: {
                        display: item.direction === 'left' ? 'flex' : 'block',
                        width, 
                        height
                    }
                }, handlerCreateElement(item.value, width, height))
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

    return <>{handlerCreateElement(layoutConfig, containerWidth, containerHeight)}</>
}

export default LayoutBox
