"use client";
import React, { useState } from "react";
import TabContent from "@/components/TabContent";

import { viewData } from "./temp_data";

import ButtonGroup from "@/components/ui/ButtonGroup";
import Input from "@/components/ui/Input";
import withStringState from "@/hoc/withStringState";
import withConsole from "@/hoc/withConsole";

const buttonValue = [
    { order: 1, value: "아파트", label: "아파트" },
    { order: 2, value: "오피스텔", label: "오피스텔" },
    { order: 3, value: "빌라", label: "빌라" },
    { order: 4, value: "상가", label: "상가" },
];

const tabValue = [
    { order: 3, value: "시세", label: "시세", sectionType: "panel" },
    { order: 1, value: "기본", label: "기본", sectionType: "panel" },
    { order: 2, value: "상세", label: "상세", sectionType: "panel" },
    { order: 4, value: "학군", label: "학군", sectionType: "panel" },
    { order: 5, value: "교통", label: "교통", sectionType: "panel" },
    { order: 6, value: "환경", label: "환경", sectionType: "panel" },
    { order: 7, value: "사진", label: "사진", sectionType: "picture" },
];

//const InputWithConsole = withConsole(withStringState(withConsole(Input)));
const InputWith = withStringState(Input);

function NewFilePage() {
    const [currentViewData, setCurrentViewData] = useState(
        viewData.filter((data) => data.parentTab === "기본")
    );

    const handleTabChange = (activeTab: string) => {
        setCurrentViewData(
            viewData.filter((data) => data.parentTab === activeTab)
        );
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
                    <InputWith
                        id={"building_type"}
                        label={"이름 (필수)"}
                        placeholder="이름을 입력해 주세요."
                    />

                    <ButtonGroup
                        label={"종류 (필수)"}
                        buttonList={buttonValue}
                    />
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
