"use client";
import React, { useState } from "react";
import TabMenu from "./ui/TabMenu";
import { PanelContent } from "./PanelContent";

import { ViewComponent } from "@/types/types";
import PictureContent from "./PictureContent";

interface TabMenuProps {
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

function TabContent({ tabList, viewData, onTabChange }: TabMenuProps) {
    const [activeTab, setActiveTab] = useState<string | null>("사진");

    const handleTabClick = (value: string) => {
        setActiveTab(value);
        onTabChange(value);
    };

    const renderSection = () => {
        const sectionType = tabList.find(
            (parentTab) => parentTab.value === activeTab
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
            <TabMenu
                tabList={tabList}
                activeTab={activeTab}
                onTabClick={handleTabClick}
            />
            <div className="parentTab-content">{renderSection()}</div>
        </div>
    );
}

export default TabContent;
