import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { describe, expect, it } from "vitest";
import { DrawImage } from "../../../src/pages/home/features";

describe("DrawImage", () => {

  // 组件是否正常渲染
  it("it should render DrawImage", () => {
    const { container, unmount } = render(
      <RecoilRoot>
        <DrawImage />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
    unmount();
  });

  // 当前用户看到的上传区域为三个
  it("it should DrawImage The number of upload elements is 3", () => {
    const drawImage = render(
      <RecoilRoot>
        <DrawImage />
      </RecoilRoot>
    );
    const childrenList = drawImage.queryAllByTestId('edit-container')
    expect(childrenList).toHaveLength(3)
  });
});
