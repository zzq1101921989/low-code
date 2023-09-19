import {
    FC,
    ReactNode,
    createElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRecoilValue } from "recoil";
import { GlobalState } from "../..";
import { ItemBox } from "../../components";
import ContextMenu from "../Contextmenu";
import SeparateLine from "../SeparateLine";
import styles from "./index.module.less";

// 最大的间距是多少
const maxPedding = 110;

const initContextMenu = {
	open: false,
	x: 0,
	y: 0,
};

const DrawImage: FC<any> = () => {
    
	const globalState = useRecoilValue(GlobalState);

	const { color, paddingPercentage, borderSize, layoutConfig } = globalState;

	const testLayoutCofig = layoutConfig.config;

	// 当前计算出来的间距是多少
	const padding = Math.round(maxPedding * (paddingPercentage / 100));

	// 每行最多能有多少box
	const maxContainerWidth = 800;
	const maxContainerHeight = 800;

	const ele = useRef<HTMLDivElement | null>(null);

	// 记录一下当前点击的容器
	const pendingUplaodBox = useRef<ParentNode | null>(null);

	const fileRef = useRef<HTMLInputElement | null>(null);

	const [contextMenu, setContextMenu] = useState<{
		open: boolean;
		x: number;
		y: number;
	}>(initContextMenu);

	const [activeBoxIndex, setActiveBoxIndex] = useState<number | undefined>();

	/**
	 * 通过image标签获取图片源的真实大小
	 * @param urlData
	 * @returns
	 */
	const getOriginImageSize = (
		urlData: string
	): Promise<{ width: number; height: number }> => {
		return new Promise((resolve) => {
			let img: HTMLImageElement | null = new Image();
			// 图像加载完成后的回调函数
			img.onload = function () {
				// 获取图像的宽度和高度
				const width = img!.width;
				const height = img!.height;
				img = null;
				resolve({
					width,
					height,
				});
			};
			// 将图像的源设置为已加载的图片数据
			img.src = urlData;
		});
	};

	// 组织右键菜单的默认事件
	useEffect(() => {
		const uploadBtn = document.getElementById("uploadBtn");

		const mousedownFn = (e: any) => {
			if (e.target && (e.button === 0 || e.button === 2)) {
				// 获取上传区域的dom
				const type = (e.target as HTMLElement).getAttribute(
					"data-type"
				);
				const index = (e.target as HTMLElement).getAttribute(
					"data-index"
				);
				if (type === "add") {
					setContextMenu({
						open: true,
						x:
							e["layerX"] +
							e.target.parentNode?.parentNode?.offsetLeft,
						y:
							e["layerY"] +
							e.target.parentNode?.parentNode?.offsetTop +
							2,
					});
					setActiveBoxIndex(Number(index));
					pendingUplaodBox.current = (
						e.target as HTMLElement
					).parentNode;
				}
			}
		};

		const click = () => {
			fileRef.current?.click();
		};

		const outsideCloseMenuContext = (e: MouseEvent) => {
			if (e.target?.id === "drawImage_container") {
				setContextMenu({
					...initContextMenu,
				});
			}
		};

		uploadBtn?.addEventListener("click", click);

		document.body.addEventListener("click", outsideCloseMenuContext);

		if (ele.current) {
			ele.current.addEventListener("mousedown", mousedownFn);
		}

		return () => {
			uploadBtn?.removeEventListener("click", click);
			ele.current?.removeEventListener("mousedown", mousedownFn);
			document.body.removeEventListener("click", outsideCloseMenuContext);
		};
	}, []);

	const createrItemBox = (
		width: number,
		height: number,
		left: number,
		top: number,
		key: any
	) => {
		return createElement(
			"div",
			{
				className: "edit-container",
				"data-testid": "edit-container",
				key,
				style: {
					position: "absolute",
					left,
					top,
					width,
					height,
				},
			},
			<ItemBox
				dataIndex={key}
				activeIndex={activeBoxIndex}
				width={width}
				height={height}
			/>
		);
	};

	/**
	 *
	 * @param layout 当前配置
	 * @param containerWidth 父级容器的宽度
	 * @param containerHeight 父级容器的高度
	 * @param occupyWidth 从何位置开始绘制
	 * @param occupyHeight 从何位置开始绘制
	 */
	const handlerLayout = (
		layout: LowCodeType.LayoutConfig[],
		containerWidth: number,
		containerHeight: number,
		occupyWidth: number,
		occupyHeight: number,
		parentDirection?: string
	) => {
		let elements: ReactNode[] = [];

		// 已经占据了多少呢？
		let occupyW = occupyWidth;
		let occupyH = occupyHeight;

		layout.forEach((lay) => {
			// 子元素 布局的方向
			const { dirW, dirH, children, direction, isTop, flagNum } = lay;

			// 获取父容器的布局方式
			let isLeftLayout = false;
			let isTopLayout = false;

			if (direction && flagNum) {
				if (direction === "left") {
					isLeftLayout = true;
				}
				if (direction === "top") {
					isTopLayout = true;
				}
			} else {
				if (parentDirection === "left") {
					isLeftLayout = true;
				}
				if (parentDirection === "top") {
					isTopLayout = true;
				}
			}

			// 有子元素
			if (children && direction) {
				// 最外层的元素需要 减去 边框 的数值
				const contaW = isTop
					? containerWidth - borderSize * 2
					: containerWidth;
				const contaH = isTop
					? containerHeight - borderSize * 2
					: containerHeight;

				const currnetW =
					contaW * dirW -
					(isLeftLayout && flagNum ? flagNum * padding : 0);
				const currnetH =
					contaH * dirH -
					(isTopLayout && flagNum ? flagNum * padding : 0);

				elements = elements.concat(
					handlerLayout(
						children,
						currnetW,
						currnetH,
						occupyW,
						occupyH,
						direction
					)
				);

				if (parentDirection === "left") occupyW += currnetW;
				if (parentDirection === "top") occupyH += currnetH;
			}
			// 没有子元素
			else {
				const { dirH, dirW, type, key } = lay;

				if (type !== "flag") {
					const currentWidth = containerWidth * dirW;
					const currentHeight = containerHeight * dirH;
					elements.push(
						createrItemBox(
							currentWidth,
							currentHeight,
							occupyW,
							occupyH,
							key
						)
					);
					if (isLeftLayout) occupyW += currentWidth;
					if (isTopLayout) occupyH += currentHeight;
				}
				// 这里面代表的是两个上传区域之间的横杠内容
				else {
					if (isLeftLayout) {
						elements.push(
							<SeparateLine
								key={key}
								left={occupyW}
								top={occupyH}
								width={padding}
								height={containerHeight}
								direction="left"
							/>
						);
						occupyW += padding;
					} else if (isTopLayout) {
						elements.push(
							<SeparateLine
								key={Math.random() * 100000}
								left={occupyW}
								top={occupyH}
								width={containerWidth}
								height={padding}
								direction="top"
							/>
						);
						occupyH += padding;
					}
				}
			}
		});

		return elements;
	};

	return (
		<div
			style={{
				width: "800px",
				height: "800px",
				margin: "10px auto",
				backgroundColor: color,
				boxShadow: "0 0 10px #d9d6d6",
			}}
		>
			<div
				data-testid="drawImage_container"
				className={styles.drawImageContainer}
				ref={ele}
				style={{
					position: "relative",
					width: maxContainerWidth,
					height: maxContainerHeight,
				}}
                onContextMenu={(e) => {
                    e.preventDefault();
                }}
			>
				{handlerLayout(
					testLayoutCofig,
					maxContainerWidth,
					maxContainerHeight,
					borderSize,
					borderSize,
					testLayoutCofig[0].direction
				)}
				<ContextMenu
					left={contextMenu.x}
					top={contextMenu.y}
					open={contextMenu.open}
				/>
				{/* 上传元素 */}
				<input
					ref={fileRef}
					type="file"
					id="cellImgPicker"
					accept="image/jpeg,image/png"
					style={{ display: "none" }}
					onChange={async (e) => {
						const file = e.target.files?.[0];
						if (file) {
							const urlData = URL.createObjectURL(file);
							const container =
								pendingUplaodBox.current as HTMLElement;
							const image =
								container.getElementsByTagName("image")[0];
							if (image) {
								const { width, height } =
									await getOriginImageSize(urlData);

								// 显示图片
								image.setAttributeNS(
									"http://www.w3.org/1999/xlink",
									"xlink:href",
									urlData
								);
								image.setAttribute("originWidth", width + "");
								image.setAttribute("originHeight", height + "");

								// 防止内存泄露，释放图片内存
								image.addEventListener("load", () => {
									URL.revokeObjectURL(urlData);
								});

								// 解决上传同一个文件，浏览器认为没变化，而造成读取失败的问题
								fileRef.current!.value = "";
							}

							setContextMenu(initContextMenu);
						}
					}}
				/>
			</div>
		</div>
	);
};

export default DrawImage;
