"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

function Header() {
    const router = useRouter();

    const onClickCreate = () => {
        //폴더 생성 페이지 이동
        router.push("/folder/new-folder");
    };

    return (
        <div className="header-container">
            <span className="content-title">폴더</span>
            <span onClick={onClickCreate} className="add-icon">
                <BsFillPlusCircleFill size={34} />
            </span>
        </div>
    );
}

export default Header;
