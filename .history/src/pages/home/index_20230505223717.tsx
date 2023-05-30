import { Col, Row } from "antd";
import { FC } from "react";
import { DrawImage, Menu } from "./features";
import styles from "./index.module.less";

const Home: FC = () => {
  return (
    <Row style={{ height: "100%" }} className={styles.homeContainer}>
      <Col xl={5}>
        <Menu />
      </Col>
      <Col xl={19}>
        <DrawImage />
      </Col>
    </Row>
  );
};

export default Home;
