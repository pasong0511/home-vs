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

function ButtonGroup({ buttonList }: ButtonGroupProps) {
    const sortButtonList = buttonList.sort((a, b) => a.order - b.order);
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (value: string) => {
        setActiveButton(value === activeButton ? null : value);
    };

    return (
        <div className="button-group">
            {sortButtonList.map((button) => (
                <button
                    key={button.value}
                    className={`type-button ${
                        button.value === activeButton ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(button.value)}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
}

export default ButtonGroup;
