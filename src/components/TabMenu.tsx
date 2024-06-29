"use client";
import React, { useState } from "react";

interface TabMenuProps {
    tabList: Tab[];
}

interface Tab {
    order: number;
    value: string;
    label: string;
}

function TabMenu({ tabList }: TabMenuProps) {
    const sortList = tabList.sort((a, b) => a.order - b.order);

    //배열의 맨 앞에 있는 것이 기본 값
    const [activeButton, setActiveButton] = useState<string | null>(
        tabList[0].value
    );

    const handleClick = (value: string) => {
        setActiveButton(value === activeButton ? null : value);
    };

    return (
        <div className="tab-menu">
            {sortList.map((item) => (
                <button
                    key={item.value}
                    className={`tab-button ${
                        item.value === activeButton ? "active" : ""
                    }`}
                    onClick={() => handleClick(item.value)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default TabMenu;
