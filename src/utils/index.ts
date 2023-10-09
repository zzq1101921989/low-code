/**
 * 获取元素的边距
 * @param ele 元素
 * @param direction 方向
 * @returns number
 */
export const getElementBoundingClientRect = (ele: Element, direction: 'left' | 'right' | 'top' | 'bottom') => {
    return ele.getBoundingClientRect()[direction]
}