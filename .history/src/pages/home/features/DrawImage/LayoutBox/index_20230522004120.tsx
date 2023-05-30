import { DOMElement, FC, createElement } from 'react'
import { ItemBox } from '../../../components'

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

    const handlerCreateElement = (config: LayoutConfig[], orgiginWidth: number, orgiginHeight: number): (DOMElement<any, any> | React.ReactNode) []  => {
        const ele = config.map(item => {

            const width = s

            const height = orgiginHeight * item.height

            const children = item.value || []

            return createElement('div', {
                className: 'edit-container',
                style: {
                    display: item.direction === 'left' ? 'flex' : 'block',
                    width, 
                    height
                }
            }, children.length ? handlerCreateElement(children, width, height) : <ItemBox dataIndex={0} />)

        })

        return ele
    }

    return <>{handlerCreateElement(layoutConfig, containerWidth, containerHeight)}</>
}

export default LayoutBox
