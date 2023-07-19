declare namespace LowCodeType {
	type Direction = "top" | "left";

	type LayoutConfig = {
		isTop?: boolean;
		direction?: Direction;
		// 这种代表的是中间拖拉的组件，用于拖拉宽度或者高度的
		type?: "flag";
        // 横杠的数量
        flagNum?: number,
		dirW: number;
		dirH: number;
		key: any;
		children?: LayoutConfig[];
	};

	type LayoutItemConfigType = {
		img: string;
		config: LayoutConfig[];
	};
}
