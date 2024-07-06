"use client";
import React, { useState } from "react";
import TabMenuUI from "./ui/TabMenuUI";
import { PanelContent } from "./PanelContent";

import { ViewComponent } from "@/types/types";
import PictureContent from "./PictureContent";

interface TabMenuUIProps {
    tabList: Tab[];
    viewData: ViewComponent[];
    onTabChange: (value: string) => void;
}

interface Tab {
    order: number;
    value: string;
    label: string;
    sectionType: string;
}

function TabContent({ tabList, viewData, onTabChange }: TabMenuUIProps) {
    const [activeTab, setActiveTab] = useState<string | null>(tabList[0].value);

    const handleTabClick = (value: string) => {
        setActiveTab(value);
        onTabChange(value);
    };

    const renderSection = () => {
        const sectionType = tabList.find(
            (tab) => tab.value === activeTab
        )?.sectionType;

        switch (sectionType) {
            case "panel":
                return <PanelContent viewData={viewData} />;
            case "picture":
                return <PictureContent />;
        }
    };

    return (
        <div>
            <TabMenuUI
                tabList={tabList}
                activeTab={activeTab}
                onTabClick={handleTabClick}
            />
            <div className="tab-content">{renderSection()}</div>
        </div>
    );
}

export default TabContent;
