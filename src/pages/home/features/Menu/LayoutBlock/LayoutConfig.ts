
const config: LowCodeType.LayoutItemConfigType[] = [
  {
    img: "https://st-gdx.dancf.com/templets/83874/shots/20190201-103827-Nwb64.png",
    config: [
      {
        direction: "top",
        isTop: true,
        dirW: 1,
        dirH: 1,
        children: [
          {
            dirW: 1,
            dirH: 0.5,
          },
          {
            direction: "left",
            dirW: 1,
            dirH: 0.5,
            children: [
              {
                dirW: 0.33,
                dirH: 1,
              },
              {
                dirW: 0.33,
                dirH: 1,
              },
              {
                dirW: 0.33,
                dirH: 1,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default config;
