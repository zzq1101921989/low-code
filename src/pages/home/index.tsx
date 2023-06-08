import { Col, Row } from "antd";
import { FC, useState } from "react";
import { DownLoadImage, DrawImage, Menu } from "./features";
import styles from "./index.module.less";

// 最大的间距是多少
const maxPedding = 110

// 最大的边框
const maxBorder = 0

const Home: FC = () => {

  const [ paddingPercentage, setPaddingPercentage ] = useState(15)

  // 当前计算出来的间距是多少
  const padding = Math.round(maxPedding * (paddingPercentage / 100))

  return (
    <Row style={{ height: "100%" }} className={styles.homeContainer}>
      <Col xl={5}>
        <Menu paddingPercentage={paddingPercentage} setPaddingPercentage={setPaddingPercentage} />
      </Col>
      <Col xl={19}>
        <DrawImage padding={padding} />
      </Col>
      <DownLoadImage />
    </Row>
  );
};

export default Home;
