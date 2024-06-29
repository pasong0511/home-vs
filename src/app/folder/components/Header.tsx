"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

interface HeaderProps {
    title?: string;
    routeUrl: string;
}

function Header({ title, routeUrl }: HeaderProps) {
    const router = useRouter();

    const onClickCreate = () => {
        router.push(routeUrl);
    };

    return (
        <div className="header-container">
            <span className="content-title">{title}</span>
            <span onClick={onClickCreate} className="add-icon">
                <BsFillPlusCircleFill size={34} />
            </span>
        </div>
    );
}

export default Header;
