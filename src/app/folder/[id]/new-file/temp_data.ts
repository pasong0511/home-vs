// const viewData = [
//     {
//         viewType: "input",
//         display: true,
//         parentTab: "기본",
//         data: "인풋1",
//         config: {
//             label: "인풋1",
//             placeholder: "인풋1",
//             className: "",
//         },
//     },
//     {
//         viewType: "input",
//         display: true,
//         parentTab: "기본",
//         data: "인풋2",
//         config: {
//             label: "인풋2",
//             placeholder: "인풋2",
//             className: "",
//         },
//     },
//     {
//         viewType: "text_area",
//         display: true,
//         parentTab: "기본",
//         data: "텍스트에리어",
//         config: {
//             label: "텍스트에리어",
//             placeholder: "텍스트에리어",
//             className: "",
//         },
//     },
//     {
//         viewType: "button_group",
//         display: true,
//         parentTab: "기본",
//         data: "버튼그룹",
//         config: {
//             className: "",
//             buttonList: [
//                 { order: 1, value: "아파트", label: "아파트" },
//                 { order: 2, value: "오피스텔", label: "오피스텔" },
//                 { order: 3, value: "빌라", label: "빌라" },
//                 { order: 4, value: "상가", label: "상가" },
//             ],
//         },
//     },
//     {
//         viewType: "text_area",
//         display: true,
//         parentTab: "상세",
//         data: "상세정보",
//         config: {
//             label: "상세 정보",
//             placeholder: "상세 정보를 입력하세요.",
//             className: "",
//         },
//     },
// ];

export const viewData = [
    {
        itemId: "준공연도",
        viewType: "input",
        display: true,
        parentTab: "기본",
        data: "",
        config: {
            label: "준공연도",
            placeholder: "준공연도를 입력해 주세요",
            subPlaceholder: "년",
            className: "",
        },
    },
    {
        itemId: "세대수",
        viewType: "input",
        display: true,
        parentTab: "기본",
        data: "",
        config: {
            label: "세대수",
            placeholder: "준공연도를 입력해 주세요",
            subPlaceholder: "년",
            className: "",
        },
    },
    {
        itemId: "총 주자대수",
        viewType: "input",
        display: true,
        parentTab: "기본",
        data: "",
        config: {
            label: "총 주자대수",
            placeholder: "총 주자대수를 입력해주세요",
            subPlaceholder: "대",
            className: "",
        },
    },
    {
        itemId: "난방식",
        viewType: "button_group",
        display: true,
        parentTab: "기본",
        data: null,
        config: {
            label: "난방식",
            className: "",
            buttonList: [
                { order: 1, value: "개별", label: "개별" },
                { order: 2, value: "중앙", label: "중앙" },
                { order: 3, value: "지역", label: "지역" },
            ],
        },
    },
    {
        itemId: "현관구조",
        viewType: "button_group",
        display: true,
        parentTab: "기본",
        data: null,
        config: {
            label: "현관구조",
            className: "",
            buttonList: [
                { order: 1, value: "복도식", label: "복도식" },
                { order: 2, value: "계단식", label: "계단식" },
                { order: 3, value: "복합식", label: "복합식" },
            ],
        },
    },
    {
        itemId: "현관구조",
        viewType: "button_group",
        display: true,
        parentTab: "기본",
        data: null,
        config: {
            label: "현관구조",
            className: "",
            buttonList: [
                { order: 1, value: "복도식", label: "복도식" },
                { order: 2, value: "계단식", label: "계단식" },
                { order: 3, value: "복합식", label: "복합식" },
            ],
        },
    },
    {
        itemId: "현관구조",
        viewType: "combined_input",
        display: true,
        parentTab: "기본", //상속 대상
        data: null,
        config: {
            //label: "현관구조",
            className: "",
            combined: [
                {
                    itemId: "최저층",
                    viewType: "input",
                    display: true,
                    data: null,
                    config: {
                        label: "최저층",
                        placeholder: "최저층",
                        subPlaceholder: "층",
                    },
                },
                {
                    itemId: "최고층",
                    viewType: "input",
                    display: true,
                    data: null,
                    config: {
                        label: "최고층",
                        placeholder: "최고층",
                        subPlaceholder: "층",
                    },
                },
            ],
        },
    },
];
