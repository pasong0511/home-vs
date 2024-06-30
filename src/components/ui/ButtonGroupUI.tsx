"use client";
import React, { useState } from "react";

interface ButtonGroupProps {
    buttonList: Button[];
}

interface Button {
    order: number;
    value: string;
    label: string;
}

function ButtonGroupUI({ buttonList }: ButtonGroupProps) {
    const sortList = buttonList.sort((a, b) => a.order - b.order);
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleClick = (value: string) => {
        setActiveButton(value === activeButton ? null : value);
    };

    return (
        <div className="button-group">
            {sortList.map((item) => (
                <button
                    key={item.value}
                    className={`type-button ${
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

export default ButtonGroupUI;
