"use client";
import React, { useState } from "react";
import TabMenuUI from "./ui/TabMenuUI";
import { ContentComponent } from "./ContentComponent";

import { ViewComponent } from "@/types/types";

interface TabMenuUIProps {
    tabList: Tab[];
    viewData: ViewComponent[];
    onTabChange: (value: string) => void;
}

interface Tab {
    order: number;
    value: string;
    label: string;
}

function TabContent({ tabList, viewData, onTabChange }: TabMenuUIProps) {
    const [activeTab, setActiveTab] = useState<string | null>(tabList[0].value);

    const handleTabClick = (value: string) => {
        setActiveTab(value);
        onTabChange(value);
    };

    return (
        <div>
            <TabMenuUI
                tabList={tabList}
                activeTab={activeTab}
                onTabClick={handleTabClick}
            />
            <div className="tab-content">
                <ContentComponent viewData={viewData} />
            </div>
        </div>
    );
}

export default TabContent;
