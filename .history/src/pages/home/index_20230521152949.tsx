import { Col, Row } from "antd";
import { FC, useState } from "react";
import { DrawImage, Menu } from "./features";
import styles from "./index.module.less";

// 最大的间距是多少
const maxPedding = 60

// 最大的边框
const maxBorder = 0

const Home: FC = () => {

  const [ paddingPercentage, setPaddingPercentage ] = useState(10)

  return (
    <Row style={{ height: "100%" }} className={styles.homeContainer}>
      <Col xl={5}>
        <Menu paddingPercentage={paddingPercentage} setPaddingPercentage={setPaddingPercentage} />
      </Col>
      <Col xl={19}>
        <DrawImage />
      </Col>
    </Row>
  );
};

export default Home;
