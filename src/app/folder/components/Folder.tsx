// src/app/folder/components/Folder.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { BsThreeDots } from "react-icons/bs";

function Folder({ item }: { item: IFolder }) {
    const router = useRouter();

    const onClick = () => {
        router.push(`/folder/${item.id}`);
    };

    return (
        <article key={item.id} className="folder-item" onClick={onClick}>
            <div className="folder-icon">📁</div>
            <div className="folder-details">
                <div className="folder-name">{item.folderName}</div>
                <span className="folder-status">비어있음</span>
            </div>
            <div className="folder-options">
                <BsThreeDots />
            </div>
        </article>
    );
}

export default Folder;
