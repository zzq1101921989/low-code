/**
 * direction 代表排列方向
 * width 取小数，代表的是百分比
 * type 取flag的时候 dirW dirH 随便给
 */
const LayoutConfig: LowCodeType.LayoutItemConfigType[] = [
	{
		img: "https://st-gdx.dancf.com/templets/83874/shots/20190201-103827-Nwb64.png",
		config: [
			{
				direction: "top",
				isTop: true,
				dirW: 1,
				dirH: 1,
				key: 11,
                flagNum: 1,
				children: [
					{
						dirW: 1,
						dirH: 0.5,
						key: 1,
					},
					{
						dirW: 1,
						dirH: 1,
						type: "flag",
						key: 2,
					},
					{
						key: 10,
						direction: "left",
						dirW: 1,
						dirH: 0.5,
                        flagNum: 2,
						children: [
							{
								dirW: 0.3333,
								dirH: 1,
								key: 3,
							},
							{
								dirW: 1,
								dirH: 1,
								type: "flag",
								key: 4,
							},
							{
								dirW: 0.3333,
								dirH: 1,
								key: 5,
							},
							{
								dirW: 1,
								dirH: 1,
								type: "flag",
								key: 6,
							},
							{
								dirW: 0.3333,
								dirH: 1,
								key: 7,
							},
						],
					},
				],
			},
		],
	},
	{
		img: "https://st-gdx.dancf.com/templets/83861/shots/20190201-103102-00dTO.png",
		config: [
			{
				direction: "left",
				isTop: true,
				dirW: 1,
				dirH: 1,
				key: 1,
                flagNum: 1,
				children: [
					{
						direction: "top",
						dirW: 0.5,
						dirH: 1,
						key: 2,
                        flagNum: 1,
						children: [
							{
								dirW: 1,
								dirH: 0.5,
								key: "2.1",
							},
							{
								dirW: 1,
								dirH: 1,
								type: "flag",
								key: "2.2",
							},
							{
								dirW: 1,
								dirH: 0.5,
								key: "2.3",
							},
						],
					},
					{
						dirW: 1,
						dirH: 1,
						type: "flag",
						key: 3,
					},
					{
						direction: "top",
						dirW: 0.5,
						dirH: 1,
						key: 4,
                        flagNum: 2,
						children: [
							{
								dirW: 1,
								dirH: 0.3333,
								key: "4.1",
							},
							{
								dirW: 1,
								dirH: 1,
								type: "flag",
								key: "4.2",
							},
							{
								dirW: 1,
								dirH: 0.3333,
								key: "4.3",
							},
							{
								dirW: 1,
								dirH: 1,
								type: "flag",
								key: "4.4",
							},
							{
								dirW: 1,
								dirH: 0.3333,
								key: "4.5",
							},
						],
					},
				],
			},
		],
	},
	{
		img: "https://st-gdx.dancf.com/templets/83831/shots/20190201-091740-vHnnU.png",
		config: [
			{
				dirW: 1,
				dirH: 1,
				isTop: true,
				direction: "left",
				key: "1",
                flagNum: 1,
				children: [
					{
						dirW: 0.5,
						dirH: 1,
						direction: "top",
                        flagNum: 1,
						children: [
							{
								dirW: 1,
								dirH: 0.5,
								key: "1323",
							},
							{
								type: "flag",
								dirW: 1,
								dirH: 1,
								key: "122",
							},
							{
								dirW: 1,
								dirH: 0.5,
								key: "1545",
							},
						],
						key: "2",
					},
					{
						type: "flag",
						dirW: 1,
						dirH: 1,
						key: "3",
					},
					{
						dirW: 0.5,
						dirH: 1,
						direction: "top",
						key: "3",
                        flagNum: 1,
						children: [
							{
								dirW: 1,
								dirH: 0.5,
								key: "3.1",
							},
							{
								type: "flag",
								dirW: 1,
								dirH: 1,
								key: "3.2",
							},
							{
								dirW: 1,
								dirH: 0.5,
								direction: "top",
								key: "37",
                                flagNum: 1,
								children: [
									{
                                        dirW: 1,
                                        dirH: 0.5,
                                        direction: "left",
                                        key: "3.3",
                                        flagNum: 1,
                                        children: [
                                            {
                                                dirW: 0.5,
                                                dirH: 1,
                                                key: "3.3.3",
                                            },
                                            {
                                                type: "flag",
                                                dirW: 1,
                                                dirH: 1,
                                                key: "3.2.4",
                                            },
                                            {
                                                dirW: 0.5,
                                                dirH: 1,
                                                key: "3.3.5",
                                            }
                                        ]
                                    },
                                    {
                                        type: "flag",
                                        dirW: 1,
                                        dirH: 1,
                                        key: "3.4",
                                    },
                                    {
                                        dirW: 1,
                                        dirH: 0.5,
                                        key: "3.5",
                                    }
								],
							},
						],
					},
				],
			},
		],
	},
];

export default LayoutConfig;
