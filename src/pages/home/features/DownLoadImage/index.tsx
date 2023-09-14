import { Button } from "antd";
import type { FC } from "react";
import { useRecoilValue } from "recoil";
import { GlobalState } from "../..";

// 绘制圆角矩形
function drawRoundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius: number
) {
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + width - radius, y);
	ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI);
	ctx.lineTo(x + width, y + height - radius);
	ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);
	ctx.lineTo(x + radius, y + height);
	ctx.arc(
		x + radius,
		y + height - radius,
		radius,
		0.5 * Math.PI,
		1 * Math.PI
	);
	ctx.lineTo(x, y + radius);
	ctx.arc(x + radius, y + radius, radius, 1 * Math.PI, 1.5 * Math.PI);
}

const DownLoadImage: FC<any> = (props) => {
	const {} = props;

	const globalState = useRecoilValue(GlobalState);

	const { color, borderRadius } = globalState;

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

        // 图片有没有发生移动
		const moveX = Math.abs(Number(imageHtml.getAttribute("x"))) || 0;
		const moveY = Math.abs(Number(imageHtml.getAttribute("y"))) || 0;

        console.log(imageHtml, 'imageHtml');

		// 页面中的图像宽高
		const contentImageWidth = config.img.getBoundingClientRect().width;
		const contentImageHeight = config.img.getBoundingClientRect().height;
        

		// ( 只需要显示的区域 / 页面中图像的大小 ) ，进行除法，得出一个占据的百分比
		const areaW = config.width / contentImageWidth;
		const areaH = config.height / contentImageHeight;


		tempCanvas.width = config.width;
		tempCanvas.height = config.height;

		const tempCtx = tempCanvas.getContext("2d")!;

		// 画布裁切
		drawRoundedRect(
			tempCtx,
			0,
			0,
			config.width,
			config.height,
			borderRadius
		);
		tempCtx.clip();
        
        /**
         * 实际绘制的图片的大小，针对的是源文件，大小也是 originWidth 所保存的，
         * 所以在页面上【操作移动缩放】过后，都是需要一个比例数据的计算才能，还原页面上的操作到生成的canvas中，
         */
		tempCtx.drawImage(

			imageHtml,

            // 页面上显示的是图片是根据源图像缩放而来，所以借助这个比例，我们在移动的时候也是需要乘以这个比例
			moveX * (originImageWidth / contentImageWidth),
			moveY * (originImageWidth / contentImageWidth),

            // 在页面上显示了多少部分的内容，那么在源图像上，乘以这个比例，就能得到在源图像上应该显示多少内容
			originImageWidth * areaW,
			originImageHeight * areaH,

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
		const pendingDrawCanvasImageList = imageContainerList.map(
			(item: any) => ({
				img: item.getElementsByTagName("image")[0],
				top: Number(item.style.top.split("px")[0]),
				left: Number(item.style.left.split("px")[0]),
				width: Number(item.style.width.split("px")[0]),
				height: Number(item.style.height.split("px")[0]),
			})
		);

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
			if (
				(item.img as HTMLOrSVGImageElement).getAttribute("xlink:href")
			) {
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
