import { Col, Row } from "antd";
import { FC, useState } from "react";
import { DownLoadImage, DrawImage, Menu } from "./features";
import styles from "./index.module.less";

// 最大的间距是多少
const maxPedding = 110;

// 最大的边框
const maxBorder = 110;

const Home: FC = () => {

  // 内边距
  const [paddingPercentage, setPaddingPercentage] = useState(15);

  const [borderSize, setBorderSize] = useState(15)

  // 颜色区域选择
  const [color, setColor] = useState('rgb(237, 239, 241)')

  // 当前计算出来的间距和边框是多少
  const padding = Math.round(maxPedding * (paddingPercentage / 100));
  const border = Math.round(maxBorder * (borderSize / 100));

  // 每行最多能有多少box
  const maxContainerWidth = 800 - borderSize;
  const maxContainerHeight = 800 - borderSize;

  return (
    <Row style={{ height: "100%" }} className={styles.homeContainer}>
      <Col xl={5}>
        <Menu
          paddingPercentage={paddingPercentage}
          setPaddingPercentage={setPaddingPercentage}
          borderSize={borderSize}
          setBorderSize={setBorderSize}
          color={color}
          setColor={setColor}
        />
      </Col>
      <Col xl={19}>
        <DrawImage 
          color={color}
          padding={padding}
          borderSize={borderSize}
          maxContainerWidth={maxContainerWidth}  
          maxContainerHeight={maxContainerHeight}  
        />
      </Col>
      <DownLoadImage 
        color={color}
        maxContainerWidth={maxContainerWidth}  
        maxContainerHeight={maxContainerHeight}   
      />
    </Row>
  );
};

export default Home;
