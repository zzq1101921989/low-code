import { Col, Row } from "antd";
import { FC } from "react";
import { RecoilRoot, atom } from "recoil";
import { DownLoadImage, DrawImage, Menu } from "./features";
import LayoutConfig from "./features/Menu/LayoutBlock/LayoutConfig";
import styles from "./index.module.less";

export const GlobalState = atom({
	key: "globalState",
	default: {
		/**
		 * 间距
		 */
		paddingPercentage: 15,
		/**
		 * 边框宽度
		 */
		borderSize: 15,
        /**
         * 默认色卡
         */
		color: "rgb(237, 239, 241)",
        /**
         * 默认布局配置
         */
		layoutConfig: LayoutConfig[0],
        /**
         * 圆角
         */
        borderRadius: 0
	},
});

const Home: FC = () => {
	return (
		<RecoilRoot>
			<Row
				style={{ height: "100%" }}
				className={styles.homeContainer}
			>
				<Col xl={5}>
					<Menu />
				</Col>
				<Col
					xl={19}
					id="drawImage_container"
				>
					<DrawImage />
				</Col>
				<DownLoadImage />
			</Row>
		</RecoilRoot>
	);
};

export default Home;
