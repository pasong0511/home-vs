"use client";
import React, { useState } from "react";

interface TabMenuUIProps {
    tabList: Tab[];
    activeTab: string | null;
    onTabClick: (value: string) => void;
}

interface Tab {
    order: number;
    value: string;
    label: string;
}

function TabMenuUI({ tabList, activeTab, onTabClick }: TabMenuUIProps) {
    const sortList = tabList.sort((a, b) => a.order - b.order);

    return (
        <div className="tab-menu">
            {sortList.map((item) => (
                <button
                    key={item.value}
                    className={`tab-button ${
                        item.value === activeTab ? "active" : ""
                    }`}
                    onClick={() => onTabClick(item.value)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default TabMenuUI;
