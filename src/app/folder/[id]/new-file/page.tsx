"use client";
import React, { useState } from "react";
import TabContent from "@/components/TabContent";
import ButtonGroupUI from "@/components/ui/ButtonGroupUI";

const buttonValue = [
    { order: 1, value: "아파트", label: "아파트" },
    { order: 2, value: "오피스텔", label: "오피스텔" },
    { order: 3, value: "빌라", label: "빌라" },
    { order: 4, value: "상가", label: "상가" },
];

const tabValue = [
    { order: 3, value: "시세", label: "시세" },
    { order: 1, value: "기본", label: "기본" },
    { order: 2, value: "상세", label: "상세" },
    { order: 4, value: "학군", label: "학군" },
    { order: 5, value: "교통", label: "교통" },
    { order: 6, value: "환경", label: "환경" },
    { order: 7, value: "사진", label: "사진" },
];

const viewData = [
    {
        viewType: "input",
        display: true,
        tab: "기본",
        data: "인풋1",
        config: {
            label: "인풋1",
            placeholder: "인풋1",
            className: "",
        },
    },
    {
        viewType: "input",
        display: true,
        tab: "기본",
        data: "인풋2",
        config: {
            label: "인풋2",
            placeholder: "인풋2",
            className: "",
        },
    },
    {
        viewType: "text_area",
        display: true,
        tab: "기본",
        data: "텍스트에리어",
        config: {
            label: "텍스트에리어",
            placeholder: "텍스트에리어",
            className: "",
        },
    },
    {
        viewType: "button_group",
        display: true,
        tab: "기본",
        data: "버튼그룹",
        config: {
            className: "",
            buttonList: [
                { order: 1, value: "아파트", label: "아파트" },
                { order: 2, value: "오피스텔", label: "오피스텔" },
                { order: 3, value: "빌라", label: "빌라" },
                { order: 4, value: "상가", label: "상가" },
            ],
        },
    },
    {
        viewType: "text_area",
        display: true,
        tab: "상세",
        data: "상세정보",
        config: {
            label: "상세 정보",
            placeholder: "상세 정보를 입력하세요.",
            className: "",
        },
    },
];

function NewFilePage() {
    const [currentViewData, setCurrentViewData] = useState(
        viewData.filter((data) => data.tab === "기본")
    );

    const handleTabChange = (activeTab: string) => {
        setCurrentViewData(viewData.filter((data) => data.tab === activeTab));
    };

    return (
        <div>
            <div>파일만들기</div>
            <div>
                <header className="app-header">
                    <div className="location">
                        서울특별시 관악구 신림동 1660
                    </div>
                </header>
                <main>
                    <div className="input-group">
                        <label htmlFor="name">이름 (필수)</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="이름을 입력해 주세요."
                        />
                    </div>
                    <div className="input-group">
                        <label>종류 (필수)</label>
                        <ButtonGroupUI buttonList={buttonValue} />
                    </div>

                    <TabContent
                        tabList={tabValue}
                        viewData={currentViewData}
                        onTabChange={handleTabChange}
                    />
                </main>
            </div>
        </div>
    );
}

export default NewFilePage;
