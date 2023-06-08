import { Button } from "antd";
import type { FC } from "react";
import { maxContainerHeight, maxContainerWidth } from "../DrawImage";

type DownLoadImageProps = {};
const DownLoadImage: FC<DownLoadImageProps> = (props) => {
  const {} = props;

  // 获取所有图片的元素，整合在canvas中进行导出
  const handlerDownLoadImage = () => {
    // 1、获取元素
    const imageContainerList = Array.from(
      document.querySelectorAll(".edit-container")
    );

    // 2、转换格式
    const pendingDrawCanvasImageList = imageContainerList.map((item) => ({
      img: item.getElementsByTagName("image")[0],
      top: Number(item.style.top.split("px")[0]),
      left: Number(item.style.left.split("px")[0]),
      width: Number(item.style.width.split("px")[0]),
      height: Number(item.style.height.split("px")[0]),
    }));

    // 3、创建canvas画布
    const canvas = document.createElement("canvas");
    canvas.width = maxContainerWidth;
    canvas.height = maxContainerHeight;

    // 4、获取绘制上下文
    const ctx = canvas.getContext("2d");

    pendingDrawCanvasImageList.forEach(item => {
        ctx?.drawImage(
            item.img,
            item.left,
            item.top,
            item.width,
            item.height,
          );
    })

    // 5、下载文件
    const imgURL = canvas.toDataURL("image/jpg");
    var dlLink = document.createElement('a');
    dlLink.download = '文件下载';
    dlLink.href = imgURL;
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);

  };

  return (
    <div
      style={{
        position: "absolute",
        right: 10,
        top: 10,
      }}
    >
      <Button
        type="primary"
        onClick={() => {
          handlerDownLoadImage();
        }}
      >
        下载
      </Button>
    </div>
  );
};

export default DownLoadImage;
