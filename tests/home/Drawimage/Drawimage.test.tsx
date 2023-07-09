import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { describe, expect, it } from "vitest";
import { DrawImage } from "../../../src/pages/home/features";

describe("DrawImage", () => {
  it("it should render DrawImage", () => {
    // 模拟一个函数
    const { container } = render(
      <RecoilRoot>
        <DrawImage />
      </RecoilRoot>
    );
    expect(container).toMatchSnapshot();
  });
});
