import { Button } from "antd";
import type { FC } from "react";

type DownLoadImageProps = {
  /**
   * 颜色
   */
  color: string;

  /**
   * 最大外层容器的宽度
   */
  maxContainerWidth: number;

  /**
   * 最大外层容器的高度
   */
  maxContainerHeight: number;
};
const DownLoadImage: FC<DownLoadImageProps> = (props) => {
  const { color } = props;

  /**
   * 图片转canvas
   * @param image
   * @returns
   */
  const imageToCanvas = (config: any): HTMLCanvasElement => {
    const tempCanvas = document.createElement("canvas");

    const imageHtml = config.img as HTMLImageElement;

    // 源图像的宽高
    const originImageWidth = Number(imageHtml.getAttribute("originWidth"));
    const originImageHeight = Number(imageHtml.getAttribute("originHeight"));

    // 页面中的图像宽高
    const contentImageWidth = config.img.getBoundingClientRect().width;

    // 根据页面中图像的大小 与 只需要显示的区域，进行除法，得出一个占据的百分比
    const area = config.width / contentImageWidth;

    tempCanvas.width = config.width;
    tempCanvas.height = config.height;

    const tempCtx = tempCanvas.getContext("2d")!;

    tempCtx.drawImage(
      imageHtml,
      0,
      0,
      originImageWidth * area,
      originImageHeight,
      0,
      0,
      config.width,
      config.height
    );

    return tempCanvas;
  };

  // 获取所有图片的元素，整合在canvas中进行导出
  const handlerDownLoadImage = () => {
    // 1、获取元素
    const imageContainerList = Array.from(
      document.querySelectorAll(".edit-container")
    );

    // 2、转换格式
    const pendingDrawCanvasImageList = imageContainerList.map((item: any) => ({
      img: item.getElementsByTagName("image")[0],
      top: Number(item.style.top.split("px")[0]),
      left: Number(item.style.left.split("px")[0]),
      width: Number(item.style.width.split("px")[0]),
      height: Number(item.style.height.split("px")[0]),
    }));

    // 3、创建canvas画布
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;

    // 4、获取绘制上下文
    const ctx = canvas.getContext("2d")!;

    // 5、绘制底部颜色
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 800, 800);

    pendingDrawCanvasImageList.forEach((item) => {
      if ((item.img as HTMLOrSVGImageElement).getAttribute("xlink:href")) {
        ctx.drawImage(
          imageToCanvas(item),
          0,
          0,
          item.width,
          item.height,
          item.left,
          item.top,
          item.width,
          item.height
        );
      }
    });

    // 5、下载文件
    const imgURL = canvas.toDataURL("image/jpg");
    var dlLink = document.createElement("a");
    dlLink.download = "文件下载";
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
