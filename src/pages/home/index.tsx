import { Col, Row } from "antd";
import { FC } from "react";
import { RecoilRoot, atom } from "recoil";
import { DownLoadImage, DrawImage, Menu } from "./features";
import styles from "./index.module.less";

export const GlobalState = atom({
  key: "globalState",
  default: {
    paddingPercentage: 15,
    borderSize: 15,
    color: "rgb(237, 239, 241)",
  },
});

const Home: FC = () => {
  return (
    <RecoilRoot>
      <Row style={{ height: "100%" }} className={styles.homeContainer}>
        <Col xl={5}>
          <Menu />
        </Col>
        <Col xl={19} id="drawImage_container">
          <DrawImage />
        </Col>
        <DownLoadImage />
      </Row>
    </RecoilRoot>
  );
};

export default Home;
