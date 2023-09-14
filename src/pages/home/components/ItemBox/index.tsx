import { FC, MouseEventHandler, memo, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { GlobalState } from "../..";
import styles from "./index.module.less";

interface ItemBoxProps {
	/**
	 * 当前选中的焦点区域
	 */
	activeIndex?: number;

	/**
	 * 当前组件的索引
	 */
	dataIndex: number;

	/**
	 * 容器的宽
	 */
	width: number;

	/**
	 * 容器的高
	 */
	height: number;
}

const ItemBox: FC<ItemBoxProps> = (props) => {
	const { activeIndex, dataIndex, width, height } = props;

	const image = useRef<SVGImageElement | null>(null);

	const { borderRadius } = useRecoilValue(GlobalState);

	const [itemBoxConfig, setItemBoxConfig] = useState({
		maskFlag: true,
		width: 0,
		height: 0,
	});
	const { maskFlag, width: imageWidth, height: imageHeight } = itemBoxConfig;

	// 计算高度缩放比例
	const scaleWidth = width / imageWidth;
	const scaleHeight = height / imageHeight;
	let calcImageWidth = 0;
	let calcHeight = 0;
	if (imageWidth && imageHeight) {
		if (width > height) {
			calcImageWidth = imageWidth * scaleWidth;
			calcHeight = imageHeight * scaleWidth;
			if (calcHeight < height) {
				const scale = height / calcHeight;
				calcImageWidth = calcImageWidth * scale;
				calcHeight = calcHeight * scale;
			}
		} else {
			calcImageWidth = imageWidth * scaleHeight;
			calcHeight = imageHeight * scaleHeight;
			if (calcImageWidth < width) {
				const scale = width / calcImageWidth;
				calcImageWidth = calcImageWidth * scale;
				calcHeight = calcHeight * scale;
			}
		}
	}

	const handlerBorder = () => {
		if (maskFlag) {
			return {
				border: `2px ${
					activeIndex === dataIndex
						? "solid #2354f4"
						: "dashed #1e80ff80"
				}`,
			};
		} else if (!maskFlag && activeIndex === dataIndex) {
			return {
				border: "2px solid #2354f4",
			};
		} else {
			return {};
		}
	};

	const initOnMouseEventHandler = () => {
		// 是否按下的标志
		let flag = 0;
		// 初始按下的位置x y
		let startX = 0,
			startY = 0;
		// 上次移动的距离是多少
		let prevMoveX = 0,
			prevMoveY = 0;

		return {
            onMouseDown: (e: MouseEvent) => {
                flag = 1;
                startX = e.clientX;
                startY = e.clientY;
            },
            onMouseMove: (e: MouseEvent) => {
                if (flag === 1) {
                    // 本次在屏幕中滑动的距离是多少
                    const screenMoveX = e.clientX - startX;
                    const screenMoveY = e.clientY - startY;
                    image.current?.setAttribute("x", prevMoveX + screenMoveX + "");
                    image.current?.setAttribute("y", prevMoveY + screenMoveY + "");
                }
            },
            onMouseUp: (e: MouseEvent) => {
                const screenMoveX = e.clientX - startX;
                const screenMoveY = e.clientY - startY;
                if (flag === 1) {
                    flag = 0;
                    prevMoveX += screenMoveX;
                    prevMoveY += screenMoveY;
                }

            },
        } as unknown as Record<string, MouseEventHandler<HTMLDivElement>>;
	};

	useEffect(() => {
		const load = () => {
			setItemBoxConfig({
				maskFlag: false,
				width: Number(image.current?.getAttribute("originWidth")),
				height: Number(image.current?.getAttribute("originHeight")),
			});
		};
		image.current?.addEventListener("load", load);
		return () => {
			image.current?.removeEventListener("load", load);
		};
	}, []);

	return (
		<div
			className={styles.itemBox}
			style={{
				borderRadius,
				...(!maskFlag && {
					cursor: "all-scroll",
				}),
			}}
			{...(!maskFlag && initOnMouseEventHandler())}
		>
			<svg
				view-box={`0 0 ${width} ${height}`}
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<g
					style={{
						transform: "matrix(1, 0, 0, 1, 0, 0)",
					}}
				>
					<image
						ref={image}
						width={calcImageWidth}
						height={calcHeight}
					/>
				</g>
			</svg>

			{/* 叉叉 */}
			<span
				className={styles.close}
				onClick={() => {
					if (image.current?.getAttribute("xlink:href")) {
						image.current?.setAttribute("xlink:href", "");
						image.current?.setAttribute("x", "");
						image.current?.setAttribute("y", "");
						setItemBoxConfig({
							...itemBoxConfig,
							maskFlag: true,
						});
					}
				}}
			>
				<svg
					version="1.1"
					id="图层_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 16 16"
				>
					<path
						d="M11.8,1.6l-0.7,0.7L7.8,5.6L4.6,2.3L3.9,1.6L3.1,2.3L2,3.4L1.3,4.1L2,4.8l3.3,3.3L2,11.4l-0.7,0.7L2,12.8 L3.1,14l0.7,0.7L4.6,14l3.3-3.3l3.3,3.3l0.7,0.7l0.7-0.7l1.1-1.1l0.7-0.7l-0.7-0.7l-3.3-3.3l3.3-3.3l0.7-0.7l-0.7-0.7l-1.1-1.1 L11.8,1.6L11.8,1.6z"
						style={{
							opacity: 0.9,
							fill: "rgb(255, 255, 255)",
						}}
					></path>{" "}
					<g>
						<polygon points="13,4.1 11.8,3 7.8,7 3.9,3 2.7,4.1 6.7,8.1 2.7,12.1 3.9,13.3 7.8,9.3 11.8,13.3 13,12.1 9,8.1 	"></polygon>
					</g>
				</svg>
			</span>

			{/* 加号 */}
			<span
				style={{
					display: maskFlag ? "flex" : "none",
				}}
				className={styles.add}
				data-type="add"
				data-index={dataIndex}
			>
				+
			</span>

			{/* 边框 */}
			<div
				className="item-border"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width,
					height,
					borderRadius: borderRadius,
					...handlerBorder(),
					boxSizing: "border-box",
				}}
			></div>
		</div>
	);
};
export default memo(ItemBox);
