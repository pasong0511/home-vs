"use client";
import React, { useState } from "react";

import TabMenu from "./TabMenu";
import { ContentComponent } from "./ContentComponent";

import { ViewComponent } from "@/types/types";

interface TabMenuProps {
    tabList: Tab[];
    viewData: ViewComponent[];
}

interface Tab {
    order: number;
    value: string;
    label: string;
}

function TabContent({ tabList, viewData }: TabMenuProps) {
    //배열의 맨 앞에 있는 것이 기본 값
    const [activeTab, setActiveTab] = useState<string | null>(tabList[0].value);

    const handleTabClick = (value: string) => {
        setActiveTab(value);
    };

    //사실 여기서 컴포넌트마다 다를 이유는 없다
    const renderContent = () => {
        switch (activeTab) {
            case "기본":
                return <ContentComponent viewData={viewData} />;

            case "상세":
                return <div>Details Content</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <TabMenu
                tabList={tabList}
                activeTab={activeTab}
                onTabClick={handleTabClick}
            />
            <div className="tab-content">{renderContent()}</div>
        </div>
    );
}

export default TabContent;
